<template>
    <div id="app">
        <input v-model="address" placeholder="請輸入Address">
    <div style="margin:20px"></div>

        <button  @click="chose1()" :class="{active : show1}">1 號</button>
        <span style="margin-right:10px"></span>
        <button  @click="chose2()" :class="{active : show2}">2 號</button>
<div></div>
    <button style="margin:20px ;background-color: #97CBFF" @click="choice">確認投票</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    data(){
        return{
            show1:false,
            show2:false,
            candi:{},
            address:""
            }
        },
    computed: {
    // // ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    // ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData']),
        getCandidates() {
            return  this.getContractData({
                contract: 'VoteCollection',
                method: 'getCandidates'
            })
        }
    },
    methods: {
        choice(){
        this.candi = this.getContractData({
        contract: 'VoteCollection',
        method: 'getCandidates'
        })

        alert(this.candi)
        },
        chose1() {
            this.show1 = true
            this.show2 = false
        // alert('123');
        },
        chose2(){
            this.show1=false
            this.show2=true
        }
    },

}
</script>
<style scoped>
.active{
    background-color: #FFAAD5;
}
</style>