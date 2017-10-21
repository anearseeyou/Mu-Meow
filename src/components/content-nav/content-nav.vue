<template>
    <div class="nav">
        <div class="nav-music">
            <span v-show="routerChange == 0" class="music-text">原声音乐</span>
            <span v-show="routerChange == 1" class="music-text">经典台词</span>
            <span v-show="routerChange == 2" class="music-text">电影故事</span>
            <span v-show="routerChange == 3" class="music-text">影片短评</span>
        </div>
        <div class="nav-item" @click="routerChange = 0">
            <router-link to="/homepage/music">
                <span class="icon-music-bar" :class="{current:routerChange == 0}"></span>
            </router-link>
        </div>
        <div class="nav-item" @click="routerChange = 1">
            <router-link to="/homepage/lines">
                <span class="icon-line-bar" :class="{current:routerChange == 1}"></span>
            </router-link>
        </div>
        <div class="nav-item" @click="routerChange = 2">
            <router-link to="/homepage/story">
                <span class="icon-story-bar" :class="{current:routerChange == 2}"></span>
            </router-link>
        </div>
        <div class="nav-item" @click="routerChange = 3">
            <router-link to="/homepage/comment">
                <span class="icon-rat-bar" :class="{current:routerChange == 3}"></span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                routerChange: 0
            }
        },
        mounted(){
            if (this.routerChange === 0) {
                this.$router.push('/homepage/music');
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .nav {
        display: flex;
        margin: 0 .4rem;
        padding-bottom: 40px;
        .nav-music {
            flex: 6;
        }
        .nav-item {
            flex: 1;
            padding-left: 30px;
            text-align: right;
            & > a {
                display: block;
                &:last-child {
                    padding-left: 30px;
                }
                &.active > span:before {
                    color: #161619;
                }
            }
        }
    }

    .music-text {
        flex: 0.2;
        font-size: 36px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        &:after {
            content: ' ';
            display: block;
            height: 1px;
            width: 100%;
            background-color: #1F253D;
            position: absolute;
            bottom: -5px;
            left: 0;
        }
    }

    .nav .nav-item span {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        background-size: 40px 40px;
        background-repeat: no-repeat;
    }

    // 音乐
    .nav .icon-music-bar {
        background-image: url("img/music-nc.png");
    }

    .nav .icon-music-bar.current {
        background-image: url("img/music-c.png");
    }

    // 台词
    .nav .icon-line-bar {
        background-image: url("img/lines-nc.png");
    }

    .nav .icon-line-bar.current {
        background-image: url("img/lines-c.png");
    }

    // 故事
    .nav .icon-story-bar {
        background-image: url("img/story-nc.png");
    }

    .nav .icon-story-bar.current {
        background-image: url("img/story-c.png");
    }

    // 评论
    .nav .icon-rat-bar {
        background-image: url("img/ratings-nc.png");
    }

    .nav .icon-rat-bar.current {
        background-image: url("img/ratings-c.png");
    }
</style>