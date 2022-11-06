<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { computed } from 'vue';

    const baseProp = useAttributeStore().baseProp

    const setInfo = computed(()=>{
        const setInfo = new Map()
        baseProp.relicset.forEach((value,key)=>{
            if(value>=2){setInfo.set(key,value)}
        })
        return setInfo
    })
</script>

<template>
<div class="box">
    <div class="main">
    <div class="row" v-for="s in setInfo">
        <div class="name">{{s[0]}}</div><div class="value">{{s[1]}}</div>
    </div></div>
    <div class="result">
        <div class="class">D</div>
        <div class="score">0分</div>
    </div>
</div>    
</template>

<style scoped lang="scss">
    .box{
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        height: 100%;
        font-size: 14px;
        .main{
            display: flex;
            flex-flow: column wrap;
            width: 50%;
            height: 100%;
            justify-content: center;
            .row{
                display: flex;
                flex-flow: row wrap;
                height: 50%;
                width: 100%;
                align-items: center;
                text-align: center;
                .name{
                    width: 70%; 
                }
                .value{
                    width: 30%;
                }
            }
        }
        .result{
            display: flex;
            flex-flow: column wrap;
            width: 50%;
            div{
                display: flex;
                height: 50%;
                width: 100%;
                align-items: center;
                justify-content: center;
            }

        }
    }
</style>