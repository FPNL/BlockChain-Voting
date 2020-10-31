<template>

    <div id="app">
            <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <!-- <input v-model="address" placeholder="請輸入Address"><br> -->
    <drizzle-contract-form id="AddressInput"
        contractName="VoteProvider"
        method="giveVote"
        :placeholders="['請輸入Address']"/>

        <!-- <button type="submit" style="margin:10px" @click="get">送出</button> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    data(){
        return{
            address:""
        }
    },
    computed: {
    ...mapGetters('contracts', ['getVoteForUser']),
        // get() {
        //     return  this.getVoteForUser({
        //         contract: 'VoteProvider',
        //         method: 'giveVote'
        //     })
        // }
    },
    methods: {
        // get(){
        //     this.result = this.gitVote({
        //     contract: 'VoteProvider',
        //     method: 'giveVote'
        //     })
        // }
    }
}
</script>
<style>
#AddressInput input{
    margin: 20px;
}
</style>