<template>
    <div class="home-nav">
        <router-link to="/homepage" class="ctrl-nav">
            <div class="nav-bar">
                <span class="home-img"></span><br>
                <span ref="home">首页</span>
            </div>
        </router-link>
        <router-link to="/recommend" class="ctrl-nav">
            <div class="nav-bar">
                <span class="recommend-img"></span><br>
                <span ref="recommend">推荐</span>
            </div>
        </router-link>
        <router-link to="/search" class="ctrl-nav">
            <div class="nav-bar">
                <span class="search-img"></span><br>
                <span ref="search">搜索</span>
            </div>
        </router-link>
        <router-link to="/mine" class="ctrl-nav">
            <div class="nav-bar">
                <span class="mine-img"></span><br>
                <span ref="mine">我的</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {}
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
        .nav-bar {
            width: 100%;
            height: 100%;
        }
        .home-img, .recommend-img, .search-img, .mine-img {
            width: 40px;
            height: 40px;
            margin-top: 14px;
            margin-bottom: 10px;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: 40px 40px;
        }
        .active {
            color: #161619;
            .home-img {
                background-image: url("img/home-c.png");
            }
            .recommend-img {
                background-image: url("img/recommend-c.png");
            }
            .search-img {
                background-image: url("img/search-c.png");
            }
            .mine-img {
                background-image: url("img/mine-c.png");
            }
        }
        .home-img {
            background-image: url("img/home-nc.png");
        }
        .recommend-img {
            background-image: url("img/recommend-nc.png");
        }
        .search-img {
            background-image: url("img/search-nc.png");
        }
        .mine-img {
            background-image: url("img/mine-nc.png");
        }
    }
</style>