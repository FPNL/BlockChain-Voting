<template>
  <div>
    <template v-if="publicKey">
      <CryptoVoting contractName="VoteCollection" method="voteTo" :placeholders="['投票']" :publicKey="publicKey"/>
    </template>
    <p v-else>
      Loading...
    </p>

  </div>
</template>

<script>
import CryptoVoting from '@/components/CryptoVoting.vue';
import { getPublicKey } from '@/plugins/api.js';

export default {
  name: "Voting",
  components: {
    CryptoVoting
  },
  data() {
    return {
      publicKey: '',
    }
  },
  async mounted() {
    this.publicKey = await getPublicKey();
  },
}
</script>

<style scoped>

</style>
