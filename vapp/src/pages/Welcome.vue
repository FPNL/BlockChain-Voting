<template>
  <div>
    歡迎使用投票系統，目前選舉項目為『水果大戰』，
    發起投票者：
    <drizzle-contract contractName="VoteCollection" method="owner"/>

    <div class="flex-container">
      <drizzle-contract contractName="VoteCollection" method="getCandidates" label="多幾拉摳搜" />
    </div>

    <ParseContractResult contractName="VoteCollection" method="votingTime" parseValueBy="time"/>

    <div>
      <input type="text" placeholder="輸入錢包地址" v-model="address" style="width:200px">
      <button @click="getVote">取票</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTicketByAddress } from '@/plugins/api';
import ParseContractResult from '@/components/ParseContractResult.vue';

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

</style>
