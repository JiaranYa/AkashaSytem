<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';
import { useHashtableStore } from 'src/stores/localHashtable';
import { computed } from 'vue';

    const props = defineProps({
        itemType:String
    })
    const itemList:any = useAttributeStore().itemList

    const item = computed(()=>{
        return itemList[props.itemType as string]
    })

    const propTable = useHashtableStore().propTable

    const baseurl = useUrlStore().baseurl
    const iconurl = computed(()=>{
        return baseurl + 'artifacts/'+ item.value.icon+'.png'
    }) 
</script>

<template>
<div>
    <div class="icon"><img :src="iconurl"/></div>
    <div class="info">
        <div v-for="prop in item.mainstat" class="mainprop">
            <div class="name">{{propTable[prop[0]]}}</div>
            <div class="value">+{{prop[1]}}</div>
        </div>
        
        <div class="rank">
            <span>+{{item.level}}</span>
            <div><p v-for="i in item.rank">★</p></div>
        </div>
    </div>
    <div class="score">
        <div>D</div>
        <div>0分</div>
    </div>
    <div class="subprop">
        <div v-for="prop in item.substat" class="row">
            <div class="name">{{propTable[prop[0]]}}</div>
            <div class="value">+{{prop[1]}}</div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">  
div{
    display: flex;
    height: 70px;
    .icon{
        height: 100%;
    }
    .info{
        width: 25%;
        font-size: 0.7em;
        flex-flow: column wrap;
        .mainprop{
            height: 70%;
            flex-direction: column;
            .name{
                height: 50%;
                font-size: 14px;
                font-weight: 800;
                align-items: center;
            }
            .value{
                height: 50%;
                font-size: 12px;
                font-weight: 600;
                align-items: center;
            }
        }
        .rank{
            height: 30%;
            justify-content: space-between;
        }
    }
    .score{
        width: 20%;
        flex-direction: column;
        div{
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }
    .subprop{
        width: 35%;
        display: flex;
        flex-flow: column wrap;
        .row{
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            width: 100%;
            height: 25%;
            font-size: 12px;
            font-weight: 700;
            .name{
                width: 60%;
            }
            .value{
                width: 40%;
                text-align: right;
                justify-content: flex-end;
            }
            
        }
    }

}

</style>