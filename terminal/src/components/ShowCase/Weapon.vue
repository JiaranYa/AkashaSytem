<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';

    const itemInfo = useAttributeStore().itemList
    const weapon = computed(()=>{
        return itemInfo.weapon
    })

    const baseurl = useUrlStore().baseurl
    const iconurl = computed(()=>{
        return baseurl + "weapon/"+ weapon.value.icon + ".png"
    })
</script>

<template>
<div>
    <div class="icon"><img :src="iconurl" /></div>
    <div class="info">
        <div>{{weapon.nameText}}</div>
        <div>
            <p v-for="_ in weapon.rank">★</p>
        </div>
        <div class="info2">
            <div>LV.{{weapon.level}}</div>
            <div>R{{weapon.affixMap+1}}</div>
        </div>
    </div> 
</div>
</template>

<style scoped lang="scss">
    div{
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        .icon{
            width: 25%;
            height: 100%;
        }
        .info{
            display: flex;
            height: 100%;
            width: 80px;
            flex-flow: column;
            .info2{
                justify-content: space-between;
            }
        }
    }
</style>