<template>
  <component v-bind:is="contractData.component" :label="label" />
</template>

<script>
import { mapGetters } from 'vuex'
import ContractData from './presentational/Data'
import ContractArrayData from './presentational/ArrayData'
import ContractObjectData from './presentational/ObjectData'
import jsencrypt from 'jsencrypt'

export default {
  props: {
    contractName: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    toUtf8: {
      type: Boolean,
      default: false
    },
    toAscii: {
      type: Boolean,
      default: false
    },
    methodArgs: {
      type: Array,
      default: () => []
    }
  },

  components: {
    ContractData,
    ContractArrayData,
    ContractObjectData
  },

  computed: {
    ...mapGetters('contracts', ['getContractData', 'contractInstances']),

    isStale() {
      return !this.contractInstances[this.contractName].synced
    },

    contractData() {
      const arg = {
        contract: this.contractName,
        method: this.method,
        toUtf8: this.toUtf8,
        toAscii: this.toAscii
      }
      let component = 'ContractData'
      let contractData = this.getContractData(arg)

      if (Array.isArray(contractData)) {
        component = 'ContractArrayData'
      } else if (typeof contractData === 'object') {
        component = 'ContractObjectData'
        // Todo: document in => out example to explain this transformation
        contractData = Object.entries(contractData)
            .filter(([key]) => /^\D/.test(key))
            .map(([key, value]) => ({ key, value: this.decryptData(value) }))
      }

      return {
        data: contractData,
        component
      }
    }
  },
  methods: {
    decryptData(privateKey, data) {
      // 新建JSEncrypt对象
      let decrypt = new jsencrypt();
      // 设置私钥
      decrypt.setPrivateKey(privateKey);
      // 解密数据
      return decrypt.decrypt(data);
    }
  },
  created() {
    const { contractName, method, methodArgs } = this

    this.$store.dispatch('drizzle/REGISTER_CONTRACT', {
      contractName,
      method,
      methodArgs
    })
  }
}
</script>
<style scoped>
.stale {
  /* Release the inner Jackson Pollock */
  border: 1px solid red;
  background-color: yellow;
}
</style>
