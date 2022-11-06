<script setup lang="ts">
  import { ChatDotRound, Refresh, Search, SwitchButton, Back } from '@element-plus/icons-vue'
  import { computed, reactive } from 'vue'
  import type { FormRules } from 'element-plus';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { usePlayerInfoStore } from 'src/stores/playerInfo'
  import { useHashtableStore } from 'src/stores/localHashtable';
  import { useLocalStore } from 'src/stores/localstorage'
  import { useUrlStore } from 'src/stores/IconUrl';

  const router = useRouter()
  const playerInfo = usePlayerInfoStore().infoList
  const database = useLocalStore().database
  const iconname = useHashtableStore().iconNameTable

  const baseurl = useUrlStore().baseurl
  const iconurl = computed(()=>{
     return baseurl+'roles/UI_AvatarIcon_' + iconname[playerInfo.profilePicID]+'.png'
  }) 

  const isUserLogin = computed(()=>{
    return database.playerInfo !== undefined
  })

  const route = useRoute()
  const isHome = computed(()=>{
    return route.path === "/"
  })
  
  const account = reactive({
    uid:''
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
      if(localStorage.getItem("uid")===playerInfo.uid){
        useLocalStore().writeLocalStore(updateList)
      }else{
        localStorage.setItem("temp",JSON.stringify(updateList))
      }
      useLocalStore().getDatabase()
      router.push({name:'display'})
    }).catch( ()=>{
      // TODO: 弹窗： 服务器暂时不允许更新
      console.log("服务器异常错误")
    })
  }
  const check = ()=>{
        router.push({name:'display'})
    }

  const logOut = ()=>{
        localStorage.clear()
        useLocalStore().getDatabase()
  }

  const back = ()=>{
        router.push({name:'home'})
  }
</script>

<template>
    <div class="bar">
      <div class="isnotlogin" :style="{'display':(isUserLogin? 'none':'')}">
        <el-form :model="account" :rules="rules">
        <el-form-item prop="uid">
          <div class="inputbox">
          <el-input 
            v-model="account.uid"
            placeholder="请绑定UID..."
          /></div>
        </el-form-item>
        <div class="buttons">
        <el-button type="success" :icon="SwitchButton" @click="submitUID(account.uid)" circle />
        </div>
      </el-form>
      </div>
      <div class="islogin" :style="{'display':(isUserLogin? '':'none')}">
        <div class="icon">
          <el-avatar shape="circle" size="large" fit="fill" :src="iconurl" />
        </div>
        <div class="info">
          <div class="col1">{{playerInfo.nickname}}</div>
          <div class="col2">
            <div class="block1">
              Lv.{{playerInfo.level}}
            </div>
            <div class="block2">
              <el-icon><ChatDotRound color="#93806A"/></el-icon>
              {{playerInfo.signature}}
            </div>
          </div>
        </div>
        <div class="buttons">
          <el-button type="success" :icon="Refresh" @click="submitUID(database.uid)" circle />
          <el-button type="info" :icon="Search" @click="check" circle :style="{'display':(isHome? '':'none')}" />
          <el-button type="danger" :icon="SwitchButton" @click="logOut" circle :style="{'display':(isHome? '':'none')}" />
          <el-button type="danger" :icon="Back" @click="back" circle :style="{'display':(isHome? 'none':'')}"/>
        </div>
      </div> 
    </div>
</template>

<style scoped lang="scss">
@media (max-width: 650px){
.block2{
    display: none;
}
}

.bar:before{
    content: "";
    position:absolute;
    display: block;
    height: 60px;
    width: 99%;
    filter: blur(10px);
    background-color: #d3fa94;
    z-index: -1;
}
.bar {
    width: 100vw;
    height: 60px;
    border-top: 1px solid rgba(255,255,255, 0.5);
    border-left: 1px solid rgba(255,255,255,0.5);
    border-bottom: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.5);
    background: linear-gradient(
        to right bottom,
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.4)
    );
    .isnotlogin{
    margin: 0 auto;
    padding: 8px 10px;
    .inputbox{
        width: 50%;
        margin: 0 auto;
    }
    .buttons{
        position: relative;
        bottom: 50px;
        float: right;
    }
    }
    .islogin{
    padding: 2px 10px;
    width: 100%;
    .icon{
        width: 80px;
        display: inline-block;
        vertical-align: top;
    }
    .info{
        padding-top: 5px;
        width: 70%;
        font-weight: bold;
        display: inline-block;
        position: absolute;
        z-index: 0;
        .col1{
        font-size: 15px;
        height: 20px;
        color: #424F65;
        padding-top: 2px;
        }
        .col2{
        display: flex;
        font-size: 10px;
        padding-top: 6px;
        .block1{
            width: 30%;
            color: #424F65;
        }
        .block2{
            width: 70%;
            color: #93806A;
        }
        }
    }
    .buttons{
        float: right;
        margin: 12px auto;
    }
    }
}
</style>