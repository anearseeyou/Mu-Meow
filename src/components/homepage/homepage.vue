<template>
    <div class="homepage-wrap" v-cloak>
        <!-- 首页头部 -->
        <div class="header">
            <a class="movie-code" href="javascript:;"></a>
            <span class="movie-title">{{ homeData.name }}</span>
        </div>
        <!-- 电影海报 -->
        <div class="banner">
            <img class="banner-poster" src="static/img/poster.png">
        </div>
        <!-- 上映时间 -->
        <div class="banner-info">
            <span class="deliveryTime">上映时间：{{ homeData.release }}</span>
            <span class="score">豆瓣评分：{{ homeData.score }}分</span>
        </div>
        <!-- 内容导航 -->
        <content-nav></content-nav>
        <!-- 占位符 -->
        <div class="content-nav">
            <keep-alive>
                <router-view :homeData="homeData"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import contentNav from 'components/content-nav/content-nav';
    import {requestData} from 'src/api/request';
    import {params} from 'src/api/params'
    export default {
        data(){
            return {
                homeData: Object,
                homeUrl: 'http://192.168.0.244:8081/web/m2/index.do'
            }
        },
        mounted(){
            requestData(this.homeUrl,
                {
                    page: params.homepage,
                    pageSize: params.pageSize,
                    accountId: params.accountId,
                    accessToken: params.accessToken
                })
                .then((res) => {
                    this.homeData = res.data[0];
                    // console.log(this.homeData);
                });
        },
        components: {
            'content-nav': contentNav
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .header {
        width: 100%;
        height: 88px;
        line-height: 88px;
        text-align: center;
        background: #161619;
        box-sizing: border-box;
        position: relative;
        .movie-code {
            width: 40px;
            height: 40px;
            font-size: 50px;
            position: absolute;
            left: 30px;
            top: 24px;
            background: url('img/code.png') no-repeat;
            background-size: 100% 100%;
        }
        .movie-title {
            font-size: 40px;
            flex: 1;
            color: #FFF;
        }
    }

    .banner {
        height: 838px;
        margin: 30px;
        .banner-poster {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 1px 1px 10px #E5E5E9;
        }
    }

    .banner-info {
        display: flex;
        margin-bottom: 40px;
        .deliveryTime, .score {
            font-size: 24px;
            flex: 0.5;
            color: #aaaaaa;
        }
        .deliveryTime {
            padding-left: 30px;
        }
        .score {
            text-align: right;
            padding-right: 30px;
        }
    }
</style>