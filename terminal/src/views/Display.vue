<script setup lang="ts">
  import {usePlayerInfoStore} from 'src/stores/playerInfo'
  import {useAttributeStore} from 'src/stores/attribute'
  import { useLocalStore } from 'src/stores/localstorage'
  import ShowCase from 'src/components/ShowCase.vue'
  import RoleList from 'src/components/RoleList.vue'
  import Topbar from 'src/components/Topbar.vue'
  import { onMounted, onUnmounted } from 'vue';

  onMounted(()=>{
    useLocalStore().getDatabase()
    usePlayerInfoStore().updateInfoList() 
    useAttributeStore().setAID(info.infoList.rolelist[0])
  })
  onUnmounted(()=>{
    localStorage.removeItem("temp")
  })

  const info = usePlayerInfoStore()
</script>

<template> 
    <Topbar />

    <div class="display">
      <RoleList />

      <ShowCase />
    </div>


</template>

<style scoped lang="scss">
  .display{
    display: flex;
  }
@media (max-width:600px){
  .display{
    flex-wrap: wrap;
  }
}

</style>