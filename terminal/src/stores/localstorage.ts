import { defineStore } from "pinia";
import { reactive } from 'vue'

export const useLocalStore = defineStore('localstorage',()=>{

    const ls = reactive(localStorage)

    const writeLocalStore = (updateList:any) =>{
        if(Object.keys(updateList).length !== 0 && localStorage){
        
            // 详情 ENKA.network API
            const playerInfo = updateList.playerInfo
            const avatarInfoList = updateList.hasOwnProperty('avatarInfoList')? updateList.avatarInfoList : ""
            const uid = updateList.hasOwnProperty('uid')? updateList.uid : ""
    
            // 保存展柜和人物信息
            ls.setItem('uid',JSON.stringify(uid))
            ls.setItem('playerInfo',JSON.stringify(playerInfo))
            for(const avatar of avatarInfoList){
                ls.setItem(avatar.avatarId,JSON.stringify(avatar))
            }
    
            // 刷新角色展柜列表
            const newRoleList = new Array()
            const rl = ls.getItem('roleList')===null? new Array():JSON.parse(ls.getItem('roleList') as string)
            
            for(const value of playerInfo.showAvatarInfoList){
                newRoleList.unshift(value.avatarId)
            }
    
            for(const value of newRoleList){
                const idx:number = rl.findIndex((element:number)=>{return element===value})
                if (idx !== -1){
                    rl.splice(idx,1)
                }
                rl.unshift(value)                 
            }
            ls.setItem('roleList',JSON.stringify(rl))
        }
    }

    const database:{[key:string]:any} = reactive({})

    const getDatabase = () =>{
        // 清空database
        Object.keys(database).forEach( (key)=>{
            delete database[key]
        })
        // 读取账号存储数据
        if(ls.getItem("temp")=== null){
            for(let i=0;i<ls.length;i++){
                database[ls.key(i) as string] = JSON.parse(ls[ls.key(i) as string ])
            }
         }
        else{ 
            // 临时访问数据
            const infoList = JSON.parse(ls.getItem("temp") as string) 
            // 详情 ENKA.network API
            database["playerInfo"] = infoList.playerInfo
            database["uid"] = infoList.hasOwnProperty('uid')? infoList.uid : ""
            const RoleList = new Array()
            for(const avatar of infoList.avatarInfoList){               
                RoleList.push(avatar.avatarId)
                database[avatar.avatarId] = avatar
            }
            database["roleList"] = RoleList
        }
    }

    return { writeLocalStore, database, getDatabase}
})