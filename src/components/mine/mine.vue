<template>
    <div class="mine-wrap">
        <!-- 头部固定 -->
        <div class="header mine-center">
            <div class="movie-code"></div>
        </div>
        <div class="mine-bgc">
            <!-- 用户头像 -->
            <div class="mine-pic">
                <div class="user-pic">
                    <img class="avart" @click="avatarUpload" >
                </div>
                <span v-if="!isLogin" class="font48">152</span>
                <span v-else="isLogin" @click="signIn">请登录</span>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="mine-info">
            <a class="user-list" @click="myCollect">
                <span class="sc-bar block fl"></span>
                <span class="sc-text block fl">我收藏的</span>
                <span class="sc-open block fr"></span>
            </a>
            <a class="user-list" @click="myLiked">
                <span class="sc-bar block mine-fadu fl"></span>
                <span class="sc-text block fl">我赞过的</span>
                <span class="sc-open block fr"></span>
            </a>
            <a class="user-list" @click="myComment">
                <span class="sc-bar block mine-comment  fl"></span>
                <span class="sc-text block fl ">我评论的</span>
                <span class="sc-open block fr"></span>
            </a>
            <a class="user-list" @click="myNews">
                <span class="sc-bar block mine-news fl">
                    <i v-show="noneNews" class="remind-news"></i>
                </span>
                <span class="sc-text block fl">我的消息</span>
                <span class="sc-open block fr"></span>
            </a>
            <a class="user-list" @click="myAbout">
                <span class="sc-bar block mine-about fl"></span>
                <span class="sc-text block fl">关于我们</span>
                <span class="sc-open block fr"></span>
            </a>
            <a class="user-list" @click="signOut">
                <span class="sc-bar block mine-signout fl"></span>
                <span class="sc-text block fl">退出登录</span>
                <span class="sc-open block fr"></span>
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                isLogin: false,
                noneNews: false
            }
        },
        methods: {
            avatarUpload(){

            },
            myCollect(){
            },
            myLiked(){
            },
            myComment(){
            },
            myNews(){
            },
            myAbout(){
            },
            signOut(){
            },
            signIn(){

            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mine-center {
        position: inherit;
    }

    .mine-bgc {
        width: 100%;
        height: 300px;
        background: url("img/mine.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-bottom: 300px;
        .mine-pic {
            left: 50%;
            margin-left: -140px;
            top: 140px;
            position: absolute;
            text-align: center;
            .user-pic {
                width: 280px;
                height: 28px;
                border-radius: 50%;
                margin-bottom: 40px;
                .avart {
                    width: 280px;
                    width: 280px;
                    border-radius: 50%;
                }
            }
        }
    }

    .mine-info {
        width: 100%;
        .user-list {
            height: 160px;
            line-height: 162px;
            margin-left: 40px;
            display: block;
            border-bottom: 1px solid #ededed;
            .sc-bar, .sc-open {
                width: 90px;
                height: 100%;
                background: url("img/mine-recom.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
            }
            .sc-open {
                margin-right: 58px;
                background: url("img/info-gt.png") no-repeat center center;
                background-size: 1.1rem 2.2rem;
            }
            .sc-text {
                color: #161619;
                font-size: 30px;
                margin-left: 30px;
            }
            .mine-fadu {
                background: url("img/mine-like.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
            }
            .mine-comment {
                background: url("img/mine-write.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
            }
            .mine-news {
                background: url("img/mine-news.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
                position: relative;
                .remind-news {
                    content: '';
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #fb2d2d;
                    position: absolute;
                    right: 10px;
                    top: 30px;
                }
            }
            .mine-about {
                background: url("img/mine-about.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
            }
            .mine-signout {

                margin-bottom: 200px;
                background: url("img/mine-signout.png") no-repeat center center;
                background-size: 2.5rem 2.5rem;
            }
        }
    }

    .news-wrap {
        margin-top: 132px;
    }
</style>