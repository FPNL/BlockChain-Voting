<template>
  <main>
    <ul>
      <li><router-link :to="{ name: '@index'}">首頁</router-link></li>
      <li><router-link :to="{ name: '@votingPage'}">投票頁</router-link></li>
      <li><router-link :to="{ name: '@end'}">結果頁面</router-link></li>
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
  height: calc(100vh - 205px);
}

ul {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
