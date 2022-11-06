<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';
import { useHashtableStore } from 'src/stores/localHashtable';
import { computed } from 'vue';

    const baseprop = useAttributeStore().baseProp
    const nameTable = useHashtableStore().iconNameTable

    const baseurl = useUrlStore().baseurl
    const imgurl = computed(()=>{
        return 'url('+ baseurl +'Avatarfig/UI_Gacha_AvatarIcon_'+nameTable[baseprop.aid]+'.png)'
    })

</script>

<template>
    <div class="bg" :style="{'background-image': imgurl}"> </div>
</template>

<style>
    .bg{
        width: 100%;
        height: 100%;
        background-position: 0px;
        background-repeat: no-repeat;
        background-size: cover
    }
    
</style>

