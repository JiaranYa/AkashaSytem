<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';
import { computed } from 'vue';

    const baseProp = useAttributeStore().baseProp

    const isactive = computed(()=>{
        const activestate = new Array(6).fill(false)
        for(let i=0;i<baseProp.constellNum;i++){
            activestate[i]=true
        }
        return activestate
    })

    const baseurl = useUrlStore().baseurl
    const maskIconUrl = computed(() => (i:number)=>{
        const flag = isactive.value[i-1]? "on" : "off"
        return baseurl+"svgicon/talent"+flag+".svg"
    })
    const skillIconUrl = computed(()=>(i:number)=>{
        return baseurl + "constellation/UI_Talent_" +baseProp.enname + "_" + i + ".png"
    }

    )
</script>

<template>
    <div class="box">

    <div >
        <img class="mask" :src="maskIconUrl(1)" />
        <img class="icon" :src="skillIconUrl(1)" />
    </div>
    <div >
        <img class="mask" :src="maskIconUrl(2)" />
        <img class="icon" :src="skillIconUrl(2)"/>
    </div>
    <div >
        <img class="mask" :src="maskIconUrl(3)" />
        <img class="icon" :src="skillIconUrl(3)"/>
    </div>
    <div >
        <img class="mask" :src="maskIconUrl(4)" />
        <img class="icon" :src="skillIconUrl(4)"/>
    </div>
    <div >
        <img class="mask" :src="maskIconUrl(5)" />
        <img class="icon" :src="skillIconUrl(5)"/>
    </div>
    <div >
        <img class="mask" :src="maskIconUrl(6)" />
        <img class="icon" :src="skillIconUrl(6)"/>
    </div>

    </div>
</template>

<style scoped lang="scss">

    // 移动端
    @media (max-width:600px){
}
    // 桌面端
    @media (min-width:600px){
    // height: 100%;
    .box{
        height: 100%;
        margin: 0 auto;
        display: flex;
        div{
            margin: 0 auto;
            .mask{
                width: 50px;   
                margin: 0 auto;
            }
            .icon{
                width: 30px;
                margin: 0 auto;     
            }
        }
    }
}

</style>