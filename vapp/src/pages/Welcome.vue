<template>
  <div>
    歡迎使用投票系統，目前選舉項目為『水果大戰』
    <div class="flex-container">
      <drizzle-contract contractName="VoteCollection" method="getCandidates" label="多幾拉摳搜" />
    </div>
    <input type="text" placeholder="輸入錢包地址" v-model="address">
    <button @click="getVote">取票</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: "Welcome",
  data() {
    return {
      address: ''
    }
  },
  computed: {
    ...mapGetters('contracts', ['getContractData']),
    getCandidates() {
      return this.getContractData({
        contract: 'VoteCollection',
        method: 'getCandidates'
      })
    },
  },
  methods: {
    async getVote() {
      try {
        const response = await axios.post('http://192.168.255.15:8888/api/give-vote', {
          "to_address":this.address,
        })
        alert("取票成功\ntransaction hash id:"+ response.data.ret.txn_hash)
      } catch (error) {
        console.log(error);
        alert("取票失敗")
      }
    },
  }
}
</script>

<style scoped>

</style>
