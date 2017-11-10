<template>
    <div class="story-wrap">
        <!-- 电影故事 -->
        <div class="story-info">
            <div class="title">- 电影故事 -</div>
            <div class="story-content">
                <p class="story-text" v-html="homeData.content"></p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            homeData: {
                type: Object,
                default: null,
            }
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .story-content {
        margin: 0 30px;
        font-size: 28px;
        .story-text {
            color: #333;
            text-indent: 2em;
            line-height: 60px;
            padding-bottom: 40px;
        }

    }
</style>