<template>
  <header>
      <h1>投票系統</h1>
      <p>目前您登入的地址為 {{ activeAccount }}</p>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Header",
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    // ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    // ...mapGetters('contracts', ['getContractData'])
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  height: 50px;
}
</style>
