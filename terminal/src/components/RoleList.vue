<script setup lang="ts">
  import { Back } from '@element-plus/icons-vue';
  import {usePlayerInfoStore} from 'src/stores/playerInfo'
  import  { useAttributeStore } from 'src/stores/attribute';
  import { useHashtableStore } from 'src/stores/localHashtable';
  import { useUrlStore } from 'src/stores/IconUrl';

  const infoList = usePlayerInfoStore().infoList
  const iconname = useHashtableStore().iconNameTable

  const baseurl = useUrlStore().baseurl
  const iconurl = baseurl+"/roles/UI_AvatarIcon_"
</script>

<template>
  <div class="layout">
  <div class="button">
    <el-button size="small" plain><el-icon><Back /></el-icon></el-button>
  </div>
  <div class="scrollbar">
    <el-scrollbar height="80vh">
      <div class="scrollbar-flex-content">
      <p v-for="item in infoList.rolelist" :key="item" class="scrollbar-item">
        <button @click="useAttributeStore().setAID(item)" >
          <el-image :src="iconurl+iconname[item]+'.png'" style="width:40px" />
        </button>
      </p>
      </div>
    </el-scrollbar>
  </div>
  </div>
</template>

<style scoped lang="scss">

.layout{
  display: flex;
  .button{
    display: flex;
    width: 50px;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width:600px){
.layout{
  height: 60px;
  width: 100vw;
  .scrollbar{
    width: calc(100% - 60px) ;
  }
  .scrollbar-flex-content {
    display: flex;
    width: auto;
    .scrollbar-item{
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin: 10px 1px;
      border-radius: 4px;
      background: var(--el-color-danger-light-9);
  }
}
}

}
@media (min-width:600px){
  .layout{
    width: 60px;
    height: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    .button{
      height: 50px;
    }
    .scrollbar{
      height: calc(100% - 50px);
      // position: relative;
      // bottom: 50px;
      .scrollbar-item {
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 1px 5px;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
      }
    }
  }
}

</style>