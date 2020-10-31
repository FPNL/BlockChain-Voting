<template>
<div>
  <DecryptResult contractName="VoteCollection" method="getVoteResult" label="公佈答案！" parseValueBy="crypto"/>
</div>
</template>

<script>
import DecryptResult from "@/components/DecryptResult";
export default {
  name: "End",
  components: {
    DecryptResult
  }
}
</script>

<style scoped>

</style>
