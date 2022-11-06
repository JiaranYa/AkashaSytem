import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLocalStore } from "./localstorage";


export const usePlayerInfoStore = defineStore('playerInfo',()=>{
    const database = useLocalStore().database

    const infoList = reactive({
        level:0,
        nameCardID:0,
        nickname:'',
        signature:'',
        profilePicID:0,
        uid:"",
        rolelist:[0,],
    })

    const updateInfoList = ()=>{   
        if(Object.keys(database).length!==0){
            const info = database.playerInfo
            infoList.level = info.level
            infoList.nameCardID = info.nameCardId
            infoList.nickname = info.nickname
            infoList.profilePicID = info.profilePicture.avatarId
            infoList.signature = info.signature
            infoList.uid = database.uid
            updateRoleList()
        }
    }

    const updateRoleList = ()=>{
        infoList.rolelist = database.roleList
    }

    return {infoList, updateInfoList, updateRoleList, }
})