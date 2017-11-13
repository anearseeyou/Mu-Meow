<template>
    <div class="nav-wrapper">
        <div class="nav">
            <div class="nav-music">
                <span class="music-text">{{ navText }}</span>
            </div>
            <div class="nav-item">
                <router-link to="/homepage/music">
                    <span class="icon-music-bar"></span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/homepage/lines">
                    <span class="icon-line-bar"></span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/homepage/story">
                    <span class="icon-story-bar"></span>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link to="/homepage/comment">
                    <span class="icon-rat-bar"></span>
                </router-link>
            </div>
        </div>
        <!-- 间隙 -->
        <div class="space"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                navText: ""
            }
        },
        created(){
            this.routeChange();
        },
        methods: {
            routeChange(){
                if (this.$route.path === '/homepage/music') {
                    this.navText = "原生音乐";
                }
                else if (this.$route.path === '/homepage/lines') {
                    this.navText = "经典台词";
                }
                else if (this.$route.path === '/homepage/story') {
                    this.navText = "电影故事";
                }
                else if (this.$route.path === '/homepage/comment') {
                    this.navText = "影片短评";
                }
            },
        },
        watch: {
            $route(){
                this.routeChange();
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

    .active {
        color: #161619;
        .icon-music-bar {
            background-image: url("img/music-c.png");
        }
        .icon-line-bar {
            background-image: url("img/lines-c.png");
        }
        .icon-story-bar {
            background-image: url("img/story-c.png");
        }
        .icon-rat-bar {
            background-image: url("img/ratings-c.png");
        }
    }

    .icon-music-bar {
        background-image: url("img/music-nc.png");
    }

    .icon-line-bar {
        background-image: url("img/lines-nc.png");
    }

    .icon-story-bar {
        background-image: url("img/story-nc.png");
    }

    .icon-rat-bar {
        background-image: url("img/ratings-nc.png");
    }

</style>