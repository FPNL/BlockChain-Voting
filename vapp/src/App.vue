<template>

  <div v-if="isDrizzleInitialized" id="app">
    <header>
      <h1>投票系統</h1><br>
    </header>
    <div>
  <!-- 取票 -->
  <b-tabs content-class="mt-3">
    <b-tab title="取票" active>
      <!-- <drizzle-contract-form id="AddressInput"
        contractName="VoteProvider"
        method="giveVote"
        :placeholders="['請輸入Address']"/> -->
        <input v-model="address" placeholder="請輸入Address"><br>
        <button type="submit" style="margin:10px" @click="submit">送出</button>


      </b-tab>
<!--
    <b-tab title="投票囉">
      <input v-model="address" placeholder="請輸入Address">
      <div style="margin:20px"></div>

        <button  @click="chose1()" :class="{active : show1}">1 號</button>
        <span style="margin-right:10px"></span>
        <button  @click="chose2()" :class="{active : show2}">2 號</button>
        <button style="margin:20px ;background-color: #97CBFF" @click="choice">確認投票</button>
    </b-tab>

    <b-tab title="投票結果" >
      <div class="result">
        <span>1號</span><br><br><br>
        <span class="ticket">200票</span>
      </div>
      <div class="result">
        <span>2號</span><br><br><br>
        <span class="ticket">110票</span>
        </div>
    </b-tab> -->
  </b-tabs>
</div>

      <!-- <span>Hello, {{ activeAccount }}</span> -->
      <!-- <span>您的餘額: {{ convertedBalance }} {{ units }}</span> -->
<!--      <drizzle-account units="Ether" :precision="5" />-->


    <!-- <main> -->
      <!-- <router-link  to="/" >回到首頁</router-link><br> -->

    <!-- <router-link  to="/getVote" style="margin-top:50px">取票</router-link><br>

    <router-link  to="/Vote" class="ctab">投票去</router-link><br>

    <router-link  to="/VoteResult" >投票結果</router-link> -->
    <!-- <router-view></router-view> -->
      <!-- 候選名單
      <div class="flex-container">
        <drizzle-contract contractName="VoteCollection" method="getCandidates"
            label="候選名單6565"

        />
      </div>

      <div class="flex-container">
        <drizzle-contract contractName="VoteCollection" method="votingTime" />
      </div> -->
      <!-- 設置時間
      <drizzle-contract-form
          contractName="VoteCollection"
          method="setTime"
          :placeholders="['開始時間', '結束時間']"
      />

      設置候選項目
      <drizzle-contract-form
          contractName="VoteCollection"
          method="introduceCandidate"
          :placeholders="['請介紹項目']"
      /> -->

    <!-- </main> -->
  </div>

  <div v-else>Loading...</div>
</template>

<script>
// import TutorialToken from './TutorialToken'
// import SimpleStorage from './SimpleStorage'
// import ComplexStorage from './ComplexStorage'
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import axios from 'axios'
import jsencrypt from 'jsencrypt'
// const capitalize = ws => ws[0].toUpperCase() + ws.slice(1).toLowerCase()

// const precisionRound = (number, precision) => {
//   const factor = Math.pow(10, precision)
//   return Math.round(number * factor) / factor
// }

export default {
  name: 'app',
  components: {},
  data() {
    return {
      units: 'Ether', //Wei
      precision: 5,
      address:""
    }
  },
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData'])
    // getCandidates() {
    //   return this.getContractData({
    //     contract: 'VoteCollection',
    //     method: 'getCandidates'
    //   })
    // },
    // votingTime() {
    //   return this.getContractData({
    //     contract: 'VoteCollection',
    //     method: 'votingTime'
    //   })
    // },
    // convertedBalance() {
    //   const wei = this.activeBalance
    //   const units = capitalize(this.units)
    //   return precisionRound(
    //       this.drizzleInstance.web3.utils.fromWei(wei, units),
    //       this.precision
    //   )
    // }
  },
  methods: {
    encryptedData(publicKey, data) {
          // 新建JSEncrypt对象
          let encryptor = new jsencrypt();
          // 设置公钥
          encryptor.setPublicKey(publicKey);
          // 加密数据
          return encryptor.encrypt(data);
        },
      decryptData(privateKey,data){
          // 新建JSEncrypt对象
          let decrypt= new jsencrypt();
          // 设置私钥
          decrypt.setPrivateKey(privateKey);
          // 解密数据
          return decrypt.decrypt(data);
        },
    submit() {
      var x  = this.encryptedData('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYQBRFj+2Ryl6kkjLy+tZJT3YsaenURtPUexuWlY595LnQTNunSBtwNcJ7gLZgbkb4Bf2IIkCYgya6t+B9LjdPJ7NBGCIc7TQmTpKjcFucsA+tVuOesaYFBVF/HrL+1lNEY14oq+r7+l/BgUuVUBDUE4r7nfgPjMijSfLNLpP8+wIDAQAB','1234')
      console.log(x)
      var y = this.decryptData('MIICXQIBAAKBgQCYQBRFj+2Ryl6kkjLy+tZJT3YsaenURtPUexuWlY595LnQTNunSBtwNcJ7gLZgbkb4Bf2IIkCYgya6t+B9LjdPJ7NBGCIc7TQmTpKjcFucsA+tVuOesaYFBVF/HrL+1lNEY14oq+r7+l/BgUuVUBDUE4r7nfgPjMijSfLNLpP8+wIDAQABAoGAWq0PZb6qx0G3zFwmbABoz5C72Qfbc8obL1mCvNSl4OTwpdagm6iebt4VzmiCNjx3mBA5R3Le9fZmgp4w3V1BIryfwgQo/rZR7z15PtTJYALTXanz/+yhCn1zg/GRqpYaeo+XchohbYHKWWMen7Oebt6w828CUb6XXZc8NgQwCYECQQDr++lmISSxYmUqIfJQGPmtHPdlCYWhitfi16rv6kkrtE1GSH3v48otO/Y72KFfb7ZxBdfp50HbGTjIrVcLwKhDAkEApSn/d8uJXppB6DOkLcvQUV5FQduAlOabfQ1CfkqY94+WWIUMlIw1MNVUtMoxDXKPCna/sj5yfuMfsTeFxPhI6QJBAOg9PcCd44+S5z6ks+Tx/13IAQz1ZwbJLpd3aim8Z5BUXCxMEWyxv/nuZfEVzBKxTVpDxu7SAXTPiJuuQ9k0HCMCQQCC9JDNcEGEE/Ur4j5L3W1YBtINDLif11Tzyx6sugMdTukbWKsH4T+Pb6aRDjvkeK+30T3fWyo3N2h6gBZ9fYt5AkBf/5UplyPutgAo0V3aWLM0nF5UqUXDuSyXz7qR1WKA+QE6IdU6NiKsBBxqS93Li0XeNt69HS0YQsGmuusxChQ9','D3aHZcuQb5swKHPf8Znc1CIXzbCkpoMipn9oaj6Qv/OJfr2C4tGv1HCfYhtpiyEfAtp+EBUMUZiZfN11olBOjVSHsJk7ylsuRrbO7gLxkYS0TzvyrNStRabzSy3D0iKkuFW6ECRL8slh/cUpCIzUCc4XhIn56V7VTfDp0vsvXK8=')
      console.log(y)
      // alert(1)
    //   axios.get('http://192.168.255.20:59487/api/vote?address=123')
    //   .then(function (response) {
    //     // eslint-disable-next-line no-console
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // eslint-disable-next-line no-console
    //     console.log(error);
    // });

      // //发送get请求
      // this.$http.get('192.168.255.20:59487/api/vote',{address:123}).then(function(res){
      //     document.write(res.body);
      //     alert(res)
      //   },function(){
      //     // console.log('请求失败处理');
      //   });
    },
  }
}
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
}
main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

tab {
  margin-top:50px
}

.result{
    width:200px;
    height:200px;
    background:#ccc;
    margin-left: 100px;
    overflow: auto;
    display:inline-block
}
.ticket{
    font-size: 50px;
    margin: 30px;
    vertical-align:bottom
}

#AddressInput input{
    margin: 20px;
}
</style>
