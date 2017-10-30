<template>
    <div class="more-data">
        <p @click="loadMore" class="load-more">点我！加载更多</p>
        <!--<p v-show="!moreData.length" class="load-more">艾玛！用力过猛</p>-->
    </div>
</template>

<script type="text/ecmascript-6">

    export default{
        props: {
            moreData: {
                type: Object,
                default: null
            }
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