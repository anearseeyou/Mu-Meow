<template>
    <!-- 音乐列表 -->
    <div class="music-wrapper">
        <div class="music" v-for="(music,index) in musicList.music">
            <!-- 内容 -->
            <div class="music-origin">
                <div class="music-title">- 电影原声 -</div>
                <div class="music-info" @click="goDetail(music,musicList)">
                    <p class="music-name">{{ music.name }}</p>
                    <p class="music-sing">{{ music.singer }}</p>
                    <div class="music-rotate ">
                        <div class="music-circle"></div>
                        <a class="music-poster">
                            <img :src="music.poster ? music.poster : 'static/img/no-poster.png'">
                            <div @click.stop="audioPlay($event)" class="music-play">
                                <audio ref="audio" :src="music.sourceUrl" type="audio/mp3" preload="none"></audio>
                            </div>
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
            <!-- 间隙 -->
            <div class="space"></div>
        </div>
        <share v-show="flag" @close="close"></share>
    </div>
</template>

<script type="text/ecmascript-6">
    import Share from 'base/share/share';
    import {isLike} from 'src/api/isLike';
    import {isCollect} from 'src/api/isCollect';
    import {params} from 'src/api/params';

    export default{
        data(){
            return {
                flag: false,
                playIndex: 0,
            }
        },
        props: {
            musicList: {
                type: Object,
                default: null
            }
        },
        methods: {
            // 播放
            audioPlay(event){
                let audios = this.$refs.audio;
                if (event.currentTarget.children[0].paused) {
                    for (let i = 0, len = audios.length; i < len; i++) {
                        audios[i].pause();
                        audios[i].parentElement.className = 'music-play';
                    }
                    event.currentTarget.children[0].play();
                    console.log(event.currentTarget.className);
                    event.currentTarget.className = 'music-pause';
                }
                else {
                    event.currentTarget.children[0].pause();
                    event.currentTarget.className = 'music-play';
                }
            },
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
                    this.flag = true;
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
            close(){
                this.flag = false;
            },
            // 跳转详情页
            goDetail(music, posterArray){
                let musicId = music.id;
                this.$router.push({
                    name: 'musicdetail',
                    params: {
                        id: musicId,
                        posters: posterArray
                    }
                })
            },
            // 回调函数
            _callFn(callName, target, type){
                if (localStorage.USERINFO) {
                    callName(target, type);
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
        },
        components: {
            Share
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
            margin: 40px 0;
        }
        .music-name {
            font-size: 36px;
            margin-bottom: 20px;
        }
        .music-sing {
            font-size: 26px;
            margin-bottom: 40px;
        }
        .music-info {
            position: relative;
            text-align: left;
            color: #161619;
            .music-rotate {
                width: 100%;
                height: 300px;
                position: relative;
                .music-circle {
                    width: 280px;
                    height: 280px;
                    background: url("img/music-rotate.png") no-repeat 0 0;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-top: -140px;
                    margin-left: -220px;
                }
                .music-poster {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -150px;
                    & > img {
                        width: 300px;
                        height: 300px;
                        border-radius: 3px;
                    }
                }
                .music-play, .music-pause {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -40px;
                    margin-top: -40px;
                    width: 80px;
                    height: 80px;

                }
                .music-play {
                    background: url("img/music-play.png") no-repeat;
                    background-size: 100% 100%;
                }
                .music-pause {
                    background: url("img/music-pause.png") no-repeat;
                    background-size: 100% 100%;
                }
                .text-bg {
                    width: 62px;
                    height: 300px;
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