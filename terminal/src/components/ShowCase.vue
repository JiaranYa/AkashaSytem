<script setup lang="ts">
  import { useAttributeStore } from 'src/stores/attribute'
  import { useHashtableStore } from 'src/stores/localHashtable';
  
  import BaseInfo from './ShowCase/BaseInfo.vue'
  import Constell from './ShowCase/Constell.vue'
  import Talent from './ShowCase/Talent.vue'
  import Gacha from './ShowCase/Gacha.vue'
  import FightProp from './ShowCase/FightProp.vue'
  import Weapon from './ShowCase/Weapon.vue'
  import Itemset from './RelicCase/Itemset.vue';
  import RelicItem from './RelicCase/RelicItem.vue';
  
  const prop = useAttributeStore().baseProp
  const elementTable = useHashtableStore().elementTypeTable

</script>

<template>
<div :class="[elementTable[prop.aid],'showcase']">
  <div class="info">
    <div class="leftinfo">
      <div class="baseinfo"><BaseInfo /></div>
      <div class="constellation"><Constell /></div>
      <div class="talent"><Talent /></div>
      <div class="image"><Gacha /></div>
    </div>
    <div class="prop"><FightProp /></div>
    <div class="weapon"><Weapon /></div>
  </div>

  <div class="relics">
    <div class="relicbox"><Itemset /></div>
    <div class="relicbox"><RelicItem itemType="flower"/></div>
    <div class="relicbox"><RelicItem itemType="plume"/></div>
    <div class="relicbox"><RelicItem itemType="sands"/></div>
    <div class="relicbox"><RelicItem itemType="goblet"/></div>
    <div class="relicbox"><RelicItem itemType="circlet"/></div>
  </div>
</div>
</template>

<style scoped lang="scss">
  .elec{
    background-color: #9876ad;/* 雷 */
  }
  .water{
    background-color: #84a1c6; /* 水 */
  }
  .fire{
    background-color: #ba8c83;/* 火 */
  }
  .ice{
    background-color: #46a8ba; /* 冰 */
  }
  .wind{
    background-color: #52b0b1;/* 风 */
  }
  .grass{
    background-color: #2d8e34;/* 草 */
  }
  .rock{
    background-color: #bb9f4b;/* 岩 */
  }
  .showcase{
    display: flex;
    flex-direction: column;
    padding: 2px;
    .info{
      display: flex;
      flex-wrap: wrap;  
      align-content: flex-start;
    }
  }
// 移动端
  @media (max-width:600px){
    .showcase{
      width: 100%;
      .info{
        flex-direction: column;
        .leftinfo{
          display: flex;
          height: 100%;
          width: 50%;
          flex-flow: row wrap;
          align-content: flex-start;
          border: 2px solid firebrick;
          .baseinfo{
            width: 100%;
            height: 30%;
            border: 2px solid green;
          }
          .constellation{
            height: 70%;
            width: 30%;
            border: 2px solid green;
          }
          .talent{
            height: 70%;
            width:30%;
            border: 2px solid green;
          }
          .image{
            height: 70%;
            width:40%;
            border: 2px solid green;
          }
        }
        .prop{
          height: 70%;
          width: 50%;
          border: 2px solid green;
        }
        .weapon{
          height: 30%;
          width: 50%;
          border: 2px solid green;
        }
      }
    }
  }  
// 桌面端
  @media (min-width:600px){
    .showcase{
      .info{
        flex-direction: column;
        width: 800px;
        height:350px;
        .leftinfo{
          display: flex;
          flex-flow: column wrap;
          height: 100%;
          width: 60%;
          .baseinfo{
            width: 70%;
            height: 40%;
          }
          .constellation{
            width: 70%;
            height: 30%;
          }
          .talent{
            width: 70%;
            height: 30%;
          }
          .image{
            width: 30%;
            height: 100%;
          }
        }
        .prop{
          width: 40%;
          height: 75%;

        }
        .weapon{
          width: 40%;
          height: 25%;
        }
      }
      .relics{
        width: 800px;
        height: 240px;
        display: flex;
        flex-flow: column wrap;
        .relicbox{
          height: 33%;
        }
      }
    }   
  }
</style>