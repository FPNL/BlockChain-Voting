<template>
  <component v-bind:is="contractData.component" :label="label" />
</template>

<script>
import { mapGetters } from 'vuex'
import ContractData from './presentational/Data'
import ContractArrayData from './presentational/ArrayData'
import ContractObjectData from './presentational/ObjectData'

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
    },
    parseValueBy: {
      type: String,
      default: 'decrypt'
    },
    privateKey: String
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
            .map(([key, value]) => {
              return ({ key, value: this.mutateValue(value) });
            });
      }
      if(this.parseValueBy === 'crypto' && contractData !== "loading") {
        console.log(79)
        this.$emit('onFinishVoting', contractData)
      }

      return {
        data: contractData,
        component
      }
    }
  },
  methods: {
    mutateValue(data) {
      switch (this.parseValueBy) {
        case 'time':
        default:
          return this.parseTime(data);
      }
    },
    parseTime(timestamp) {
      if(timestamp != 0) {

        const dateObj = new Date(Number(timestamp * 1000))

        // console.log(Date(parseInt(dateObj) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
        var x1=dateObj.getFullYear().toString();
        var x2=(dateObj.getMonth()+1).toString();
        var x3=dateObj.getDate().toString();
        var x4=dateObj.getHours().toString();
        var x5=dateObj.getMinutes().toString();
        var x6=dateObj.getSeconds().toString();
        if (dateObj.getMinutes()<10){
          x5='0'+dateObj.getMinutes().toString()
        }
        if (dateObj.getSeconds()<10){
          x6='0'+dateObj.getSeconds().toString()
        }
        if (dateObj.getDate()<10){
          x3='0'+dateObj.getDate().toString()
        }
        return x1+'-'+x2+'-'+x3+' '+x4+':'+x5+':'+x6
        // return dateObj.Format("yyyy-MM-dd hh:mm:ss")
      } else{
        return "尚未設置時間"
      }
    },
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
