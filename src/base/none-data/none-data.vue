<template>
    <div class="none-data">
        <!-- 间隙 -->
        <div class="space"></div>
        <div class="none-wrap">
            <span class="none-img"></span>
            <p class="none-text">{{ noneText }}</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                noneText: "艾玛！数据罢工了！"
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .none-data {
        .none-wrap {
            width: 300px;
            height: 300px;
            margin: 0 auto;
            text-align: center;
        }
        .none-img {
            width: 300px;
            height: 180px;
            margin-bottom: 40px;
            background: url("none-data.png") no-repeat;
            background-size: 100% 100%;
        }
        .none-text {
            font-size: 24px;
        }
    }
</style>