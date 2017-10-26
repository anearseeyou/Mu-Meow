<template>
    <!-- 音乐列表 -->
    <div class="music-list">
        <div class="music" v-for="music in homeData.music">
            <!-- 间隙 -->
            <div class="space"></div>
            <!-- 内容 -->
            <div class="music-origin">
                <div class="music-title">- 电影原声 -</div>
                <div class="music-info" @click="musicDetail(music)">
                    <p class="music-name">{{ music.name }}</p>
                    <p class="music-sing">{{ music.singer }}</p>
                    <div class="music-rotate ">
                        <div class="music-circle"></div>
                        <a class="music-poster">
                            <img :src="music.poster">
                            <div class="music-play"></div>
                        </a>
                        <div class="text-bg clearfix"></div>
                    </div>
                </div>
            </div>
            <!-- 操作 -->
            <div class="music-bar">
                <span class="icon-share-bar" @click="share"></span>
                <span class="icon-collect-bar"
                      @click="musicCollect(music)"
                      :class="music.myIsCollect ? 'clickCollect' : ''">
                </span>
                <span class="icon-thumbs-bar"
                      @click="musicLike(music)"
                      :class="music.myIsPraise ? 'clickThumbs' : ''">
                    <i class="thumbs-num">{{ music.thumbs }}</i>
                </span>
            </div>
        </div>
        <!-- 暂无数据 -->
        <none-data v-if="homeData.music" v-show="!homeData.music.length"></none-data>
    </div>
</template>

<script type="text/ecmascript-6">
    import NoneData from 'base/none-data/none-data';
    import {request} from 'src/api/request';
    import {isLike} from 'src/api/isLike';
    import {isCollect} from 'src/api/isCollect';
    import {params} from 'src/api/params';

    export default{
        props: {
            homeData: {
                type: Object,
                default: null
            }
        },
        methods: {
            // 点赞
            musicLike(music){
                this._callFn(isLike, music, params.musicLike);
            },
            // 收藏
            musicCollect(music){
                this._callFn(isCollect, music, params.musicCollect);
            },
            // 分享
            share(){
                if (localStorage.USERINFO) {
                    alert("分享成功");
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
            // 跳转详情页
            musicDetail(music){
                let musicId = music.id;
                document.body.scrollTop = 0;
                this.$router.push({name: 'musicdetail', params: {id: musicId}});
            },
            // 回调函数
            _callFn(callName, target, type){
                if (localStorage.USERINFO) {
                    callName(target, type);
                }
                else {
                    this.$router.push({name: 'login'});
                }
            }
        },
        components: {
            NoneData
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .music {
        text-align: center;
        position: relative;
        .music-origin {
            padding: 0 40px;
            margin-bottom: 40px;
        }
        .music-title {
            font-size: 24px;
            color: #aaaaaa;
            text-align: center;
            margin-bottom: 40px;
        }
        .music-name {
            font-size: 36px;
            margin-bottom: 20px;
        }
        .music-sing {
            font-size: 30px;
            margin-bottom: 40px;
        }
        .music-info {
            position: relative;
            text-align: left;
            color: #161619;
            .music-rotate {
                width: 100%;
                height: 350px;
                position: relative;
                .music-circle {
                    width: 320px;
                    height: 320px;
                    background: url("img/music-rotate.png") no-repeat 0 0;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-top: -160px;
                    margin-left: -260px;
                }
                .music-poster {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -175px;
                    & > img {
                        width: 350px;
                        height: 350px;
                        border-radius: 10px;
                    }
                }
                .music-play {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -50px;
                    margin-top: -50px;
                    width: 100px;
                    height: 100px;
                    background: url("img/music-play.png") no-repeat;
                    background-size: 100px 100px;
                }
                .text-bg {
                    width: 62px;
                    height: 350px;
                    background: url("img/text-bgc.png") no-repeat right center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
</style>