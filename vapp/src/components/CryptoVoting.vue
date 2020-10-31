<template>
  <form v-if="isDrizzleInitialized">
    <!-- <input
        v-for="(param, i) in displayInputs"
        v-model="ethData[i]"
        :key="i"
        :type="param.type"
        :placeholder="param.name"
    /> -->
    <b-form-group label="投票人選">
      <b-form-radio v-model="ethData[1]" name="some-radios" value="1">Niji</b-form-radio>
      <b-form-radio v-model="ethData[2]" name="some-radios" value="2">Amber</b-form-radio>
      <b-form-radio v-model="ethData[3]" name="some-radios" value="3">Budda</b-form-radio>
      <b-form-radio v-model="ethData[4]" name="some-radios" value="4">Xillis</b-form-radio>
      <b-form-radio v-model="ethData[5]" name="some-radios" value="5">Sera</b-form-radio>

    </b-form-group>
    <b-button @click.prevent="onSubmit">Submit</b-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import jsencrypt from 'jsencrypt'

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return 'number'
    case /^string/.test(type) || /^bytes/.test(type):
      return 'text'
    case /^bool/.test(type):
      return 'checkbox'
    default:
      return 'text'
  }
}

export default {
  name: 'CryptoVoting',
  props: {
    contractName: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    methodArgs: {
      type: Array,
      default: () => []
    },
    placeholders: {
      type: Array,
      default: () => []
    },
    publicKey: String
  },

  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),

    abi() {
      const di = this.drizzleInstance
      return di.contracts[this.contractName].abi.find(
          item => item.name === this.method
      )
    },

    abiInputs() {
      return this.abi.inputs
    },

    displayInputs() {
      return this.abi.inputs.map((x, i) => ({
        name: this.placeholders[i] ? this.placeholders[i] : x.name,
        type: translateType(x.type)
      }))
    },

    utils() {
      return this.drizzleInstance.web3.utils
    }
  },

  data() {
    return {
      ethData: {}
    }
  },

  methods: {
    onSubmit() {
      const convertedInputs = this.abiInputs.map((input, i) =>
          input.type === 'bytes32'
              ? (this.ethData[i] = this.utils.toHex(this.ethData[i]))
              : this.ethData[i]
      )
      let sendArgs = this.methodArgs.length
          ? [...convertedInputs, this.methodArgs]
          : convertedInputs

      sendArgs = sendArgs.map(this.crypto);

      this.drizzleInstance.contracts[this.contractName].methods[
          this.method
          ].cacheSend(...sendArgs)
    },
    crypto(value) {
      return this.encryptedData(this.publicKey, value)
    },
    encryptedData(publicKey, data) {
      // 新建JSEncrypt对象
      let encryptor = new jsencrypt();
      // 设置公钥
      encryptor.setPublicKey(publicKey);
      // 加密数据
      return encryptor.encrypt(data+'|' + Math.floor(Math.random()*98));
    },
  }
}
</script>

<style></style>
