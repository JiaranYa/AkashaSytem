<script setup lang="ts">
  import { computed, onMounted, reactive } from 'vue'
  import type { FormRules } from 'element-plus';
  import { Search } from '@element-plus/icons-vue'
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { usePlayerInfoStore } from 'src/stores/playerInfo'
  import { useLocalStore } from 'src/stores/localstorage'
  import { useUrlStore } from 'src/stores/IconUrl';
  import Topbar from 'src/components/Topbar.vue'

  onMounted(()=>{
    localStorage.removeItem("temp")
    useLocalStore().getDatabase()
    usePlayerInfoStore().updateInfoList() 
  })
  const baseurl = useUrlStore().baseurl
  const iconurl = baseurl + 'background/sumeru.svg'

  const router = useRouter()

  const form = reactive({
    uid: '',
  })
  const rules = reactive<FormRules>({
    uid:[
      { pattern:/^[0-9]*$/, message:'请输入数字',trigger:'blur' },
      { min:9,max:9,message:'请输入9位数UID',trigger:'blur' },
    ],
  })

  const submitUID = (inputuid:string)=>{
    axios.post(
      'api/',
      {
        'uid': inputuid
      },
    ).then( (response)=>{  
      const updateList = response.data
      localStorage.setItem("temp",JSON.stringify(updateList))
      useLocalStore().getDatabase()
      router.push({name:'display'})
    }).catch( ()=>{
      // TODO: 弹窗： 服务器暂时不允许更新
      console.log("服务器异常错误")
    })
  }  
</script>
  
<template>
  <div class="bg">
  <div class="filter">
    <Topbar />
    <div class="main">
      <img :src="iconurl" width="150"/>
      <div class="title-cn">虚空终端</div>
      <div class="title-en">Akasha Terminal</div>
      <div class="input">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="uid">
          <el-input 
            v-model="form.uid"
            placeholder="请输入UID..."
            @keyup.enter="submitUID(form.uid)"
          >
          <template #append><el-button :icon="Search" @click="submitUID(form.uid)"/></template>
          </el-input>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
  </div>
</template>
  
<style scoped lang="scss">
  @font-face{
    font-family: "975Bold";
    src: url('https://cdn.jsdelivr.net/gh/lxgw/975maru@master/TTF%20SC/975MaruSC-Bold.ttf');
  }
  @import url('http://fonts.cdnfonts.com/css/freestyle-script');

  @media (max-width: 650px){
    .bg{
      margin: 0;
      height: 100vh;
      background: url(src/graphic/background/bg2.png) no-repeat fixed;
      background-size: cover;
    }
  }
  @media (min-width: 650px) {
    .bg{
      margin: 0;
      height: 100vh;
      background: url(src/graphic/background/bg1.png) no-repeat fixed;
      background-size: cover;
    }
  }  
  .filter{
    height: 100vh;
    backdrop-filter: brightness(30%);
    .main{
      text-align: center;
      line-height: 1;
      color: #d3fa94;
      margin: 80px;
      img{
        margin: 0 auto;
      }
      .title-cn{
        font-size: 40px;
        font-family:"975Bold","微软雅黑", 'Courier New', Courier, sans-serif, monospace;
      }
      .title-en{
        font-size: 40px;
        font-family:'Freestyle Script', 'Courier New', Courier, sans-serif, monospace;
      }
    }
    .input{
      width:250px;
      margin: 10px auto;
    }
  }
</style>
  