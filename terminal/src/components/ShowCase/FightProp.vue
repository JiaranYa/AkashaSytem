<script setup lang="ts">
import { useAttributeStore } from 'src/stores/attribute';
import { useUrlStore } from 'src/stores/IconUrl';
import { useHashtableStore } from 'src/stores/localHashtable';
import { computed } from 'vue';

  const baseprop = useAttributeStore().baseProp
  const Fightprop:any = useAttributeStore().attribute
  const propTable = useHashtableStore().propTable

  const elementType = computed(()=>{
    return baseprop.element as string
  })    

  const baseurl = useUrlStore().baseurl
  const svgIcon = computed(()=>{
    return {"hp":baseurl+"svgicon/hp.svg",
            "atk":baseurl+"svgicon/atk.svg",
            "def":baseurl+"svgicon/def.svg",
            "em":baseurl+"svgicon/em.svg",
            "critrate":baseurl+"svgicon/critrate.svg",
            "critdmg":baseurl+"svgicon/critdmg.svg",
            "charge":baseurl+"svgicon/recharge.svg",
            "addhurt":baseurl+"svgicon/" + elementType.value + ".svg",}
  })

  const addHurtType = computed(()=>{
    return propTable[("FIGHT_PROP_"+elementType.value+"_ADD_HURT").toUpperCase()]
  })

  const addHurtValue = computed(()=>{
    const vTable:any= {
      "physical":"phyDmgBonus",          
      "fire":"pyroDmgBonus",  
      "elec":"electroDmgBonus",     
      "water":"hydroDmgBonus",     
      "grass":"dendroDmgBonus",       
      "wind":"anemoDmgBonus",       
      "rock":"geoDmgBonus",       
      "ice":"cryoDmgBonus",     
    }
    
    return Fightprop[vTable[elementType.value]]  
  })
</script>

<template>
  <div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.hp"/></div>
      <div class="title">生命值</div>
      <div class="value">
        {{(Fightprop.hpMax).toFixed(0)}}
        <br>
        ({{(Fightprop.hpBase).toFixed(0)}}+{{(Fightprop.hpMax-Fightprop.hpBase).toFixed(0)}})
      </div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.atk"/></div>
      <div class="title">攻击力</div>
      <div class="value">
        {{(Fightprop.atk).toFixed(0)}}
        <br>
        ({{(Fightprop.atkBase).toFixed(0)}}+{{(Fightprop.atk-Fightprop.atkBase).toFixed(0)}})
      </div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.def"/></div>
      <div class="title">防御力</div>
      <div class="value">
        {{(Fightprop.def).toFixed(0)}}
        <br>
        ({{(Fightprop.defBase).toFixed(0)}}+{{(Fightprop.def-Fightprop.defBase).toFixed(0)}})
      </div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.em"/></div>
      <div class="title">元素精通</div>
      <div class="value">{{(Fightprop.elemMast).toFixed(0)}}</div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.critrate"/></div>
      <div class="title">暴击率</div>
      <div class="value">{{(Fightprop.critRate*100).toFixed(1)}}%</div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.critdmg"/></div>
      <div class="title">暴击伤害</div>
      <div class="value">{{(Fightprop.critDmg*100).toFixed(1)}}%</div>
    </div>
    <div class="row">
      <div class="icon"><img :src="svgIcon.charge" /></div>
      <div class="title">元素充能效率</div>
      <div class="value">{{(Fightprop.recharge*100).toFixed(1)}}%</div>
    </div> 
    <div class="row">
      <div class="icon"><img :src="svgIcon.addhurt" /></div>
      <div class="title">{{addHurtType}}</div>
      <div class="value">{{(addHurtValue*100).toFixed(1)}}%</div>
    </div>
  </div> 
</template>

<style scoped lang="scss">
  div{
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    margin: 2px;
    .row{
      height: 20%;
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      font-size: 0.7em;
      font-weight: 700;
      .icon{
        width: 14px;
        justify-content: center;
      }
      .title{
        width: 40%;
        padding-left: 10px;
        justify-content: center;
      }
      .value{
        width: calc(60% - 14px - 4px - 10px);
        text-align: right;
        justify-content: center;
      }
    }
  }
</style>