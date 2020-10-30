<template>
  <div v-if="isDrizzleInitialized" id="app">
    <header>
      <span>Hello, {{ activeAccount }}</span>
      <span>您的餘額: {{ convertedBalance }} {{ units }}</span>
<!--      <drizzle-account units="Ether" :precision="5" />-->
    </header>

    <main>
      候選名單
      <div class="flex-container">
        <drizzle-contract contractName="VoteCollection" method="getCandidates"
            label="候選名單6565"

        />
      </div>

      <div class="flex-container">
        <drizzle-contract contractName="VoteCollection" method="votingTime" />
      </div>
      設置時間
      <drizzle-contract-form
          contractName="VoteCollection"
          method="setTime"
          :placeholders="['開始時間', '結束時間']"
      />

      設置候選項目
      <drizzle-contract-form
          contractName="VoteCollection"
          method="introduceCandidate"
          :placeholders="['請介紹項目']"
      />

    </main>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
// import TutorialToken from './TutorialToken'
// import SimpleStorage from './SimpleStorage'
// import ComplexStorage from './ComplexStorage'
import { mapGetters } from 'vuex'
const capitalize = ws => ws[0].toUpperCase() + ws.slice(1).toLowerCase()

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}

export default {
  name: 'app',
  components: {},
  data() {
    return {
      units: 'Ether', //Wei
      precision: 5
    }
  },
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData']),
    getCandidates() {
      return this.getContractData({
        contract: 'VoteCollection',
        method: 'getCandidates'
      })
    },
    votingTime() {
      return this.getContractData({
        contract: 'VoteCollection',
        method: 'votingTime'
      })
    },
    convertedBalance() {
      const wei = this.activeBalance
      const units = capitalize(this.units)
      return precisionRound(
          this.drizzleInstance.web3.utils.fromWei(wei, units),
          this.precision
      )
    }
  },
  methods: {
    onClick() {
      // eslint-disable-next-line no-console
      console.log(this.drizzleInstance.methods)
    }
  }
}
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
}
main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
