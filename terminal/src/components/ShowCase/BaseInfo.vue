<script setup lang="ts">
    import { useAttributeStore } from 'src/stores/attribute';
    import { usePlayerInfoStore } from 'src/stores/playerInfo';
    
    const basicInfo = useAttributeStore().baseProp
    const playerInfo = usePlayerInfoStore().infoList
</script>

<template>
    <div class="name">{{basicInfo.name}}</div>
    <div class="level">LV.{{basicInfo.level}}</div> 
    <div class="owner">UID {{playerInfo.uid}}</div>
</template>

<style scoped lang="scss">
    .name{
        font-size: 1.8em;
        color: wheat;
    }
    .owner{
        font-size: 0.5em;
    }
    // 移动端
    @media (max-width:600px){

    }
    // 桌面端
    @media (min-width:600px){
        
    }
</style>