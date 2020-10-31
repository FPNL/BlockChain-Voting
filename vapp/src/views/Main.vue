<template>
  <main>
    <ul>
      <li><router-link :to="{ name: '@index'}">index</router-link></li>
      <li><router-link :to="{ name: '@votingPage'}">votingPage</router-link></li>
      <li><router-link :to="{ name: '@end'}">index</router-link></li>
    </ul>

    <router-view />
  </main>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>
main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: calc(100vh - 140px);
}
</style>
