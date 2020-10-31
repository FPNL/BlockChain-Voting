<template>
    <div id="app" >
        <div class="result">
            <span>1號</span><br><br><br>
            <span class="ticket">200票</span>
        </div>
        <div class="result">
            <span>2號</span><br><br><br>
            <span class="ticket">110票</span>

        </div>
    </div>
</template>
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