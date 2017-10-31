<template>
    <div class="more-data">
        <p v-show="moreData != 0" @click="loadMore" class="load-more">点我！加载更多</p>
        <p v-show="moreData == 0" class="load-more">艾玛！数据罢工了</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            moreData: {},
        },
        methods: {
            loadMore(){
                this.$emit('loadMore');
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .more-data {
        height: 100px;
        font-size: 26px;
        text-align: center;
        overflow: hidden;
        // background: rgba(237, 237, 237, 0.3);
        .load-more {
            width: 240px;
            height: 50px;
            line-height: 50px;
            margin: 25px auto;
            padding: 0 10px;
            background: rgba(248, 248, 248, 1);
            border-radius: 5px;
        }
    }
</style>