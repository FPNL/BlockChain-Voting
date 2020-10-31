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
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYQBRFj+2Ryl6kkjLy+tZJT3YsaenURtPUexuWlY595LnQTNunSBtwNcJ7gLZgbkb4Bf2IIkCYgya6t+B9LjdPJ7NBGCIc7TQmTpKjcFucsA+tVuOesaYFBVF/HrL+1lNEY14oq+r7+l/BgUuVUBDUE4r7nfgPjMijSfLNLpP8+wIDAQAB',
    }
  },
  async mounted() {
    this.publicKey = await getPublicKey();
  },
}
</script>

<style scoped>

</style>
