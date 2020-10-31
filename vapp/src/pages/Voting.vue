<template>
  <CryptoVoting contractName="VoteCollection" method="voteTo" :placeholders="['投票']" />
</template>

<script>
import CryptoVoting from '@/components/CryptoVoting.vue';
export default {
  name: "Voting",
  components: {
    CryptoVoting
  }
}
</script>

<style scoped>

</style>
