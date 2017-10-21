<template>
    <div class="homepage-wrap" v-cloak>
        <login></login>
        <!-- 首页头部 -->
        <div class="head-wrap">
            <div class="header">
                <a class="movie-code"></a>
                <span class="movie-title">{{ homeData.name }}</span>
            </div>
        </div>
        <!-- 电影海报 -->
        <div class="banner">
            <img class="banner-poster" :src="homeData.poster">
        </div>
        <!-- 上映时间 -->
        <div class="banner-info">
            <span class="deliveryTime">上映时间：{{ homeData.release }}</span>
            <span class="score">豆瓣评分：{{ homeData.score }}分</span>
        </div>
        <!-- 内容导航 -->
        <content-nav></content-nav>
        <!-- 占位符 -->
        <div class="content">
            <keep-alive>
                <router-view :homeData="homeData"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ContentNav from 'components/content-nav/content-nav';
    import Login from 'components/login/login';
    import {requestData} from 'src/api/request';
    import {ERR_OK} from 'api/request';
    import {params} from 'src/api/params';

    export default {
        data(){
            return {
                homeData: {},
            }
        },
        mounted(){
            this._loadHomeData();
        },
        methods: {
            // 加载首页数据
            _loadHomeData(){
                let url = 'http://api.mumiao.distspace.com/web/m2/index.do';
                requestData(url, {
                    page: params.page,
                    pageSize: params.pageSize,
                    accountId: params.accountId,
                    accessToken: params.accessToken
                }).then((res) => {
                    this.homeData = res.data[0];
                });
            },
        },
        components: {
            ContentNav,
            Login,
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .head-wrap {
        width: 100%;
        height: 88px;
        .header {
            width: 100%;
            height: 88px;
            line-height: 88px;
            text-align: center;
            background: #161619;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 150;
            .movie-code {
                width: 40px;
                height: 40px;
                position: absolute;
                left: 30px;
                top: 24px;
                background: url('img/code.png') no-repeat;
                background-size: 100% 100%;
            }
            .movie-title {
                font-size: 36px;
                flex: 1;
                color: #FFF;
            }
        }
    }

    .banner {
        margin: 30px;
        .banner-poster {
            width: 100%;
            height: 100%;
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