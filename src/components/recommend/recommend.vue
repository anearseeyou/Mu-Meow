<template>
    <div class="recommend-wrap">
        <!-- 头部固定 -->
        <div class="head-wrap">
            <div class="head">
                <span class="movie-title">幕喵推荐</span>
            </div>
        </div>
        <!-- banner -->
        <div class="title">- 推荐电影 -</div>
        <!-- 电影海报 -->
        <div class="recommend-banner">
            <img class="recommend-poster" :src="recommend.poster">
        </div>
        <div class="deliveryDate">{{ recommend.release }}</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {requestData, ERR_OK} from 'src/api/request';
    import {params} from 'src/api/params';

    const URL = 'http://api.mumiao.distspace.com/web/m2/recommend.do'

    export default{
        data(){
            return {
                recommend: {}
            }
        },
        created(){
            this._loadRecommend();
        },
        methods: {
            _loadRecommend(){
                requestData(URL, {
                    accountId: params.accountId,
                    page: params.page,
                    pageSize: params.pageSize
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommend = res.data[0];
                    }
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .recommend-banner{
        margin:0 30px;
        .recommend-poster{
            width: 100%;
            height: 100%;
        }
    }
</style>