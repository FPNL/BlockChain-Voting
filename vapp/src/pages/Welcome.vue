<template>
  <div>
    歡迎使用投票系統，目前選舉項目為『水果大戰』，
    發起投票者：
    <drizzle-contract contractName="VoteCollection" method="owner"/>
    <drizzle-contract-form contractName="VoteCollection" method="setTime"/>

    <div class="flex-container">
      <drizzle-contract contractName="VoteCollection" method="getCandidates" label="多幾拉摳搜" />
    </div>

    <ParseContractResult contractName="VoteCollection" method="votingTime" parseValueBy="time" />

    <div>
      <input type="text" placeholder="輸入錢包地址" v-model="address" class="addressInput">
      <b-button @click="getVote">取票</b-button>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTicketByAddress } from '@/plugins/api';
import ParseContractResult from '@/components/ParseContractResult.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: "Welcome",
  components: {
    ParseContractResult
  },
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
        const transId = await getTicketByAddress(this.address);
        alert(`取票成功
          transaction hash id: ${transId}`
        )
      } catch (error) {
        console.log(error);
        alert("取票失敗")
      }
    },
  }
}
</script>

<style scoped>
.addressInput{
  width:500px;
  margin:15px;
}
</style>
