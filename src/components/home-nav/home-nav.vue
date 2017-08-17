<template>
    <div class="home-nav">
        <router-link to="/homepage" class="ctrl-nav">
            <div class="nav-bar" @click="navIndex = 0">
                <span :class="navIndex == 0 ? 'home-img changeBg' : 'home-img'"></span><br>
                <span>首页</span>
            </div>
        </router-link>
        <router-link to="/recommend" class="ctrl-nav">
            <div class="nav-bar" @click="navIndex = 1">
                <span :class="navIndex == 1 ? 'recommend-img changeBg' : 'recommend-img'"></span><br>
                <span>推荐</span>
            </div>
        </router-link>
        <router-link to="/search" class="ctrl-nav">
            <div class="nav-bar" @click="navIndex = 2">
                <span :class="navIndex == 2 ? 'search-img changeBg' : 'search-img'"></span><br>
                <span>搜索</span>
            </div>
        </router-link>
        <router-link to="/main" class="ctrl-nav">
            <div class="nav-bar" @click="navIndex = 3">
                <span :class="navIndex == 3 ? 'main-img changeBg' : 'main-img'"></span><br>
                <span>我的</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                navIndex: 0
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .home-nav {
        width: 100%;
        height: 98px;
        font-size: 20px;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        background: #FFF;
        box-sizing: border-box;
        border-top: 1px solid #ededed;
        box-shadow: 0 10px 10px rgba(17, 17, 57, 0.2);
        .ctrl-nav {
            flex: 25;
            text-align: center;
        }
        .active {
            color: #161619;
        }
        .nav-bar {
            width: 100%;
            height: 100%;
        }
    }

    .home-img, .recommend-img, .search-img, .main-img {
        width: 40px;
        height: 40px;
        margin-top: 14px;
        margin-bottom: 10px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 40px 40px;
    }

    .home-img {
        background-image: url("img/home-nc.png");
    }

    .home-img.changeBg {
        background-image: url("img/home-c.png");
    }

    .recommend-img {
        background-image: url("img/recommend-nc.png");
    }

    .recommend-img.changeBg {
        background-image: url("img/recommend-c.png");
    }

    .search-img {
        background-image: url("img/search-nc.png");
    }

    .search-img.changeBg {
        background-image: url("img/search-c.png");
    }

    .main-img {
        background-image: url("img/main-nc.png");
    }

    .main-img.changeBg {
        background-image: url("img/main-c.png");
    }
</style>