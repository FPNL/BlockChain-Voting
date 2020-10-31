<template>
  <div>
    <span>
      開發者模式
        <drizzle-contract contractName="VoteCollection" method="isDev"/>
    </span>
    <drizzle-contract-form contractName="VoteCollection" method="SPECIAL_TIME" label="開發者模式"></drizzle-contract-form>
    <span>停止投票</span>
    <drizzle-contract-form contractName="VoteCollection" method="stopVoting" label="停止投票"></drizzle-contract-form>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
div {
  width: 100vw;
  height: 60px;
  background-color: chocolate;
  display: flex;
}

span {
  max-width: 100px;
}
</style>
