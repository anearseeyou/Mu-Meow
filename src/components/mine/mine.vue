<template>
    <div class="mine-wrap">
        <div class="mine-head">
            <!-- 用户头像 -->
            <div class="mine-info">
                <img class="avart" :src="avatar" @click="avatarUpload">
                <span v-if="!isLogin" class="font48">{{ phone }}</span>
                <span v-else="isLogin" @click="signIn">请登录</span>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="mine-operation">
            <a class="user-list" @click="myCollect">
                <span class="mine-bar mine-collect"></span>
                <span class="mine-text">我收藏的</span>
                <span class="mine-open"></span>
            </a>
            <a class="user-list" @click="myLiked">
                <span class="mine-bar mine-like"></span>
                <span class="mine-text">我赞过的</span>
                <span class="mine-open"></span>
            </a>
            <a class="user-list" @click="myComment">
                <span class="mine-bar mine-comment"></span>
                <span class="mine-text">我评论的</span>
                <span class="mine-open"></span>
            </a>
            <a class="user-list" @click="myNews">
                <span class="mine-bar block mine-news">
                    <i v-show="noneNews" class="remind-news"></i>
                </span>
                <span class="mine-text">我的消息</span>
                <span class="mine-open"></span>
            </a>
            <a class="user-list" @click="myAbout">
                <span class="mine-bar mine-about"></span>
                <span class="mine-text">关于我们</span>
                <span class="mine-open"></span>
            </a>
            <a class="user-list" @click="signOut">
                <span class="mine-bar mine-signout"></span>
                <span class="mine-text">退出登录</span>
                <span class="mine-open"></span>
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

    .mine-wrap {
        .mine-head {
            width: 100%;
            height: 410px;
            margin-bottom: 40px;
            background-size: 100% 100%;
            background: url("img/mine.png") no-repeat;
            .mine-info {
                width: 200px;
                position: absolute;
                left: 50%;
                top: 165px;
                margin-left: -100px;
                font-size: 30px;
                text-align: center;
                .avart {
                    width: 180px;
                    width: 180px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
            }
        }
        .mine-operation {
            width: 100%;
            .user-list {
                display: flex;
                height: 100px;
                line-height: 100px;
                padding: 0 30px;
                border-bottom: 1px solid #ededed;
                .mine-bar, .mine-open {
                    flex: 1;
                }
                .mine-open {
                    background: url("img/info-gt.png") no-repeat right;
                    background-size: 16px 30px;
                }
                .mine-text {
                    flex: 8;
                    color: #161619;
                    font-size: 26px;
                    margin-left: 10px;
                }
                .mine-collect {
                    background: url("img/mine-recom.png") no-repeat center center;
                    background-size: 30px 30px;
                }
                .mine-like {
                    background: url("img/mine-like.png") no-repeat center center;
                    background-size: 30px 30px;
                }
                .mine-comment {
                    background: url("img/mine-write.png") no-repeat center center;
                    background-size: 30px 30px;
                }
                .mine-news {
                    background: url("img/mine-news.png") no-repeat center center;
                    background-size: 30px 30px;
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
                    background-size: 30px 30px;
                }
                .mine-signout {
                    background: url("img/mine-signout.png") no-repeat center center;
                    background-size: 30px 30px;
                }
            }
        }
    }


</style>