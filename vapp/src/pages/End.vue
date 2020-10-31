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
import { getPrivateKey } from '@/plugins/api';
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
      privateKey: '',
    }
  },
  methods: {
    async resultStatistic(votingResult) {
      console.log(37)
      this.privateKey  = await getPrivateKey();
      console.log(39, this.privateKey)
      this.canShow = false;
      this.candidates = {};
      console.log(42, votingResult)
      for (const value of votingResult) {
        const saltedString = this.decryptData(value);
        console.log(45, saltedString)
        const number = saltedString.split('|');
        console.log(47, saltedString);
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
      console.log(60, this.privateKey)
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
