<template>
  <div>
    <input type="datetime-local" id="meeting-time"
      name="meeting-time"
      min="2020-06-07T00:00" max="2030-06-14T00:00"
      v-model="fromTime">
    
    <input type="datetime-local" id="meeting-time"
      name="meeting-time"
      min="2020-06-07T00:00" max="2030-06-14T00:00"
      v-model="toTime">
    <button @click.prevent="setVoteTime">設定投票時間</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'manager-view',
  components: {},
  data() {
    return {
       fromTime: "",
       toTime: "",
    }
  },
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
  },
  methods: {
    setVoteTime() {
      const di = this.drizzleInstance;
      let abi =  di.contracts["VoteCollection"].methods["setTime"];
      console.log( abi.cacheSend(Date.parse(this.fromTime), Date.parse(this.toTime)));
    },
  }
}
</script>

<style>
.result{
    width:200px;
    height:200px;
    background:#ccc;
    margin-left: 100px;
    overflow: auto;
    display:inline-block
}
.ticket{
    font-size: 50px;
    margin: 30px;
    vertical-align:bottom
}
</style>