<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';
import { useHashtableStore } from 'src/stores/localHashtable';
import { computed } from 'vue';

    const baseprop = useAttributeStore().baseProp
    const nameTable = useHashtableStore().iconNameTable

    const baseurl = useUrlStore().baseurl
    const skillIconUrl = computed(()=>{
        return {"SkillA":baseurl+"talent/Skill_A_"+baseprop.weapon+".png",
                "SkillE":baseurl+"talent/Skill_E_"+nameTable[baseprop.aid]+".png",
                "SkillQ":baseurl+"talent/Skill_Q_"+nameTable[baseprop.aid]+".png"}
    })
</script>

<template>
    <div>

    <div class="skill">
        <div>A</div>
        <div class="pic">
            <img :src="skillIconUrl.SkillA"/>
        </div>
        <div>{{baseprop.skillLevelA}}</div>
    </div> 

    <div class="skill">
        <div>E</div>
        <div class="pic">
            <img :src="skillIconUrl.SkillE"/>
        </div>
        <div>{{baseprop.skillLevelE}}</div>
    </div> 

    <div class="skill">
        <div>Q</div>
        <div class="pic">
            <img :src="skillIconUrl.SkillQ"/>
        </div>
        <div>{{baseprop.skillLevelQ}}</div>
    </div> 
 

    </div> 
</template>

<style scoped lang="scss">
    .skill{
        height: 100%;
        // width: 33%;
        margin: 0 auto;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    //移动端
    @media (max-width:600px){
}
    // 桌面端
    @media (min-width:600px){
    *{
        display: flex;
        flex-flow: row ;
    }

    .skill{
        .pic{
            width: 40px;
        }
    }
    }
</style>