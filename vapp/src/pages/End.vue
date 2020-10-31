<template>
  <div>
    <div style="position:fixed; left:100%;">
      <ParseContractResult contractName="VoteCollection" method="getVoteResult" label="公佈答案！"
          parseValueBy="crypto" :privateKey="privateKey" @onFinishVoting="resultStatistic"/>
    </div>

    <template v-if="canShow">
      <p v-for="(value, key) in candidates" :key="key+value">
        選項{{ key }}，
        獲得{{ value }}票
      </p>
    </template>
<!--      ??{{ candidates[1] }}??-->
  </div>
</template>

<script>
import ParseContractResult from "@/components/ParseContractResult";
// import { getPrivateKey } from '@/plugins/api';
import jsencrypt from 'jsencrypt'

export default {
  name: "End",
  components: {
    ParseContractResult
  },
  data() {
    return {
      candidates: {},
      canShow: false,
      privateKey: 'MIICXQIBAAKBgQCYQBRFj+2Ryl6kkjLy+tZJT3YsaenURtPUexuWlY595LnQTNunSBtwNcJ7gLZgbkb4Bf2IIkCYgya6t+B9LjdPJ7NBGCIc7TQmTpKjcFucsA+tVuOesaYFBVF/HrL+1lNEY14oq+r7+l/BgUuVUBDUE4r7nfgPjMijSfLNLpP8+wIDAQABAoGAWq0PZb6qx0G3zFwmbABoz5C72Qfbc8obL1mCvNSl4OTwpdagm6iebt4VzmiCNjx3mBA5R3Le9fZmgp4w3V1BIryfwgQo/rZR7z15PtTJYALTXanz/+yhCn1zg/GRqpYaeo+XchohbYHKWWMen7Oebt6w828CUb6XXZc8NgQwCYECQQDr++lmISSxYmUqIfJQGPmtHPdlCYWhitfi16rv6kkrtE1GSH3v48otO/Y72KFfb7ZxBdfp50HbGTjIrVcLwKhDAkEApSn/d8uJXppB6DOkLcvQUV5FQduAlOabfQ1CfkqY94+WWIUMlIw1MNVUtMoxDXKPCna/sj5yfuMfsTeFxPhI6QJBAOg9PcCd44+S5z6ks+Tx/13IAQz1ZwbJLpd3aim8Z5BUXCxMEWyxv/nuZfEVzBKxTVpDxu7SAXTPiJuuQ9k0HCMCQQCC9JDNcEGEE/Ur4j5L3W1YBtINDLif11Tzyx6sugMdTukbWKsH4T+Pb6aRDjvkeK+30T3fWyo3N2h6gBZ9fYt5AkBf/5UplyPutgAo0V3aWLM0nF5UqUXDuSyXz7qR1WKA+QE6IdU6NiKsBBxqS93Li0XeNt69HS0YQsGmuusxChQ9',
    }
  },
  async mounted() {
    // this.privateKey = await getPrivateKey()
  },
  methods: {
    resultStatistic(votingResult) {
      this.canShow = false;
      this.candidates = {};
      for (const value of votingResult) {
        const saltedString = this.decryptData(value);
        const number = saltedString.split('|');
        console.log(saltedString);
        if(!this.candidates[number[0]]) {
          this.candidates[number[0]] = 1
        } else {
          this.candidates[number[0]] += 1
        }
      }
      this.canShow = true;
    },

    decryptData(data) {
      // 新建JSEncrypt对象
      let decrypt = new jsencrypt();
      // 设置私钥
      decrypt.setPrivateKey(this.privateKey);
      // 解密数据
      return decrypt.decrypt(data);
    }
  }
}
</script>

<style scoped>

</style>
