<template>
  <div>
      <input type="datetime-local" min="2020-06-07T00:00" max="2030-06-14T00:00"
        v-model="fromTime">
      <input type="datetime-local" min="2020-06-07T00:00" max="2030-06-14T00:00"
        v-model="toTime">
    <template v-if="timeLoading">Is loading</template>

    <button @click.prevent="setVoteTime">設定投票時間</button>
    <br>
    <br>
    允許開票解密
    <button @click.prevent="uploadPrivateKey">上傳RSA私鑰</button>
    <br>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { uploadPrivateKey } from '@/plugins/api';

export default {
  name: 'manager-view',
  components: {},
  data() {
    return {
      fromTime: "",
      toTime: "",
      timeLoading: false,
    }
  },
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
  },
  methods: {
    setVoteTime() {
      this.timeLoading = true;
      this.$drizzleEvents.$once('drizzle/contractEvent', (payload) => {
          if(payload.eventName === 'SetTime') {
            alert("操作成功");
            this.timeLoading = false;
          }
      })
      console.log(Math.floor(Date.parse(this.fromTime) / 1000))
      const di = this.drizzleInstance;
      let abi =  di.contracts["VoteCollection"].methods["setTime"];
      abi.cacheSend(Math.floor(Date.parse(this.fromTime) / 1000), Math.floor(Date.parse(this.toTime) / 1000));
    },
    async uploadPrivateKey(){
      let result = await uploadPrivateKey() ;

      if (result === "ok") {
        alert("上傳RSA私鑰成功");
      }else{
        alert("上傳失敗");
      }
    }
  }
}
</script>

<style>
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
</style>
