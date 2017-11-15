<template>
    <div class="mine-wrap">
        <div class="mine-bgc">
            <!-- 用户头像 -->
            <div class="mine-info">
                <img class="avart" :src="avatar" @click="avatarUpload">
                <span v-if="!isLogin" class="font48">{{ phone }}</span>
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
    import {params} from 'api/params';

    export default{
        data(){
            return {
                isLogin: false,
                noneNews: false,
                phone: 0,
                avatar: ""
            }
        },
        created(){
            this._loginInfo();
        },
        methods: {
            _loginInfo(){
                if (localStorage.USERINFO) {
                    this.phone = params.phone;
                    this.avatar = params.avatar
                }
            },

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

    .mine-wrap{
        .mine-bgc {
            width: 100%;
            height: 410px;
            overflow: hidden;
            background-size: 100% 100%;
            background: url("img/mine.png") no-repeat;
            .mine-info {
                width: 210px;
                position: absolute;
                left: 50%;
                top: 165px;
                margin-left: -105px;
                font-size: 30px;
                text-align: center;
                .avart {
                    width: 210px;
                    width: 200px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
            }
        }
    }

    .mine-info {
        width: 100%;
        .user-list {
            display: block;
            height: 100px;
            line-height: 100px;
            padding:0 30px;
            border-bottom: 1px solid #ededed;
            .sc-bar, .sc-open {
                width: 90px;
                height: 100%;
                background: url("img/mine-recom.png") no-repeat center center;
                background-size: 30px 30px;
            }
            .sc-open {
                margin-right: 58px;
                background: url("img/info-gt.png") no-repeat center center;
                background-size: 22px 44px;
            }
            .sc-text {
                color: #161619;
                font-size: 26px;
                margin-left: 30px;
            }
            .mine-fadu {
                background: url("img/mine-like.png") no-repeat center center;
                background-size: 50px 50px;
            }
            .mine-comment {
                background: url("img/mine-write.png") no-repeat center center;
                background-size: 50px 50px;
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