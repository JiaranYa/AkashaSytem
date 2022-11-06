import { defineStore } from "pinia";
import { reactive,ref } from "vue";
import { useHashtableStore } from "./localHashtable";
import { useLocalStore } from "./localstorage";

export const useAttributeStore = defineStore('attribute',() =>{
    const database = useLocalStore().database
    const roleNameTable = useHashtableStore().roleNameTable
    const roleENNameTable = useHashtableStore().iconNameTable
    const weaponTypeTable = useHashtableStore().weaponTypeTable
    const elementTypeTable = useHashtableStore().elementTypeTable
    const weaponNameTable = useHashtableStore().weaponIdTable
    const relicNameTable = useHashtableStore().relicNameTable
    const aid = ref()
    const info = ref()
    const fightProp = ref()

    const setAID = (input:number) => { 
        aid.value = input

        if(typeof database[String(aid.value)]!== 'undefined'){
            info.value =database[String(aid.value)]
            fightProp.value = info.value.fightPropMap
        }     
        updateBaseProp()
        updateAttribute()
        updateItem()  
        baseProp.relicset = new Map()
        for(const item of ["flower","plume","sands","goblet","circlet"]){
            if(baseProp.relicset.has(itemList[item].setname)){
                baseProp.relicset.set(itemList[item].setname,baseProp.relicset.get(itemList[item].setname)+1)
            }else{
                if(itemList[item].setname !== undefined)
                {baseProp.relicset.set(itemList[item].setname,1)}
            }
        }
        
    }
    // 角色信息列表
    const baseProp = reactive({
        aid:'',             //角色编号
        name:'',            //角色名字
        enname:'',          //角色英文识别名
        weapon:'',          //武器类型
        element:'',         //元素
        level: 0,           //角色等级
        constellNum:0,      //命座数
        skillLevelA:0,      //普攻等级
        skillLevelE:0,      //元素战技等级
        skillLevelQ:0,      //元素爆发等级
        relicset: new Map(), //圣遗物套装
    })

    const updateBaseProp = ()=>{
        baseProp.aid = String(aid.value) 
        baseProp.name = roleNameTable[aid.value]
        baseProp.enname = roleENNameTable[aid.value]
        baseProp.weapon = weaponTypeTable[aid.value]
        baseProp.element = elementTypeTable[aid.value]
        baseProp.level = info.value.propMap['4001'].val
        
        if (typeof info.value.talentIdList !== 'undefined'){
            baseProp.constellNum = info.value.talentIdList.length
        }else {baseProp.constellNum = 0}

        const tempstr = Object.keys(info.value.skillLevelMap)
        baseProp.skillLevelA = info.value.skillLevelMap[tempstr[0]]
        baseProp.skillLevelE = info.value.skillLevelMap[tempstr[1]]
        baseProp.skillLevelQ = info.value.skillLevelMap[tempstr[tempstr.length-1]]
    }

    // 角色面板列表
    
    const attribute = reactive({
        hpMax:0,                //生命上限
        hpBase:0,               //基础生命
        atk:0,                  //攻击力
        atkBase:0,              //基础攻击力
        def:0,                  //防御力
        defBase:0,              //基础防御力
        critRate:0,             //暴击
        critDmg:0,              //暴伤
        recharge:0,             //充能
        healing:0,              //治疗
        elemMast:0,             //精通
        phyDmgBonus:0,          //物伤
        pyroDmgBonus:0,         //火伤
        electroDmgBonus:0,      //雷伤
        hydroDmgBonus:0,        //水伤
        dendroDmgBonus:0,       //草伤
        anemoDmgBonus:0,        //风伤
        geoDmgBonus:0,          //岩伤
        cryoDmgBonus:0,         //冰伤 
    })

    const updateAttribute = ()=>{
        attribute.hpMax = fightProp.value['2000']
        attribute.hpBase = fightProp.value['1']
        attribute.atk = fightProp.value['2001']
        attribute.atkBase = fightProp.value['4']
        attribute.def = fightProp.value['2002']
        attribute.defBase = fightProp.value['7']
        attribute.critRate = fightProp.value['20']
        attribute.critDmg = fightProp.value['22']
        attribute.recharge = fightProp.value['23']
        attribute.healing = fightProp.value['26']
        attribute.elemMast = fightProp.value['28']
        attribute.phyDmgBonus = fightProp.value['30']
        attribute.pyroDmgBonus = fightProp.value['40']
        attribute.electroDmgBonus = fightProp.value['41']
        attribute.hydroDmgBonus = fightProp.value['42']
        attribute.dendroDmgBonus = fightProp.value['43']
        attribute.anemoDmgBonus = fightProp.value['44']
        attribute.geoDmgBonus = fightProp.value['45']
        attribute.cryoDmgBonus = fightProp.value['46']
    }

    // 武器圣遗物列表
    type relic = {
        icon:string,
        nameText:string,
        level:number,
        // itemname:string
        setname:string,
        mainstat:Map<string,string>,
        substat:Map<string,string>,
        rank:number,
    }
    const itemList:any = reactive({
        weapon:{
                icon:'',
                nameText:'',
                affixMap:0,
                level:0,
                rank:0,
                },  //武器
        flower: {} as relic,   //生之花
        plume:  {} as relic,       //死之羽
        sands:  {} as relic,   //时之沙
        goblet: {} as relic,   //空之杯
        circlet:{} as relic,   //理之冠
    })

    const updateItem = ()=>{
        if(typeof info.value.equipList !== 'undefined'){
            const equipments = info.value.equipList
            for(const item of equipments){
                if(item.flat.itemType === "ITEM_WEAPON"){
                    itemList.weapon.icon = item.flat.icon
                    itemList.weapon.nameText = weaponNameTable[item.flat.nameTextMapHash]
                    itemList.weapon.affixMap = item.weapon.affixMap['1'+item.itemId]               
                    itemList.weapon.level = item.weapon.level
                    itemList.weapon.rank = item.flat.rankLevel
                }else{
                    const tempitem = {} as relic
                    tempitem.icon = item.flat.icon
                    tempitem.nameText = item.flat.nameTextMapHash
                    tempitem.level = item.reliquary.level-1
                    tempitem.setname = relicNameTable[item.flat.setNameTextMapHash]
                    // tempitem.itemname = (relicNameTable[item.flat.setNameTextMapHash] as any)[item.flat.equipType]
                    tempitem.mainstat = new Map([[item.flat.reliquaryMainstat.mainPropId,item.flat.reliquaryMainstat.statValue]])
                    tempitem.substat = new Map()
                    tempitem.rank = item.flat.rankLevel
                    for(const column of item.flat.reliquarySubstats){
                        const key:string = column.appendPropId
                        let value:string = column.statValue
                        if(key.includes("PERCENT")||key.includes("CHARGE")||key.includes("CRITICAL")
                            ||key.includes("HEAL")||key.includes("ADD")){
                            value += "%"
                        }
                        tempitem.substat.set(key,value)
                    }
                    
                    switch(item.flat.equipType){
                        case "EQUIP_BRACER": itemList.flower = tempitem
                        case "EQUIP_NECKLACE": itemList.plume = tempitem
                        case "EQUIP_SHOES": itemList.sands = tempitem
                        case "EQUIP_RING": itemList.goblet = tempitem
                        case "EQUIP_DRESS": itemList.circlet = tempitem
                    }
                }
            }
        }
    }


    return{setAID,baseProp,attribute,itemList}
})