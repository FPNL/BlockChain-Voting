<template>
  <div>
    <ParseContractResult contractName="VoteCollection" method="getVoteResult" label="公佈答案！"
        parseValueBy="crypto" :privateKey="privateKey"/>
  </div>
</template>

<script>
import ParseContractResult from "@/components/ParseContractResult";
import { getPrivateKey } from '@/plugins/api';

export default {
  name: "End",
  components: {
    ParseContractResult
  },
  data() {
    return {
      privateKey: '',
    }
  },
  async mounted() {
    this.privateKey = await getPrivateKey()
  }
}
</script>

<style scoped>

</style>
