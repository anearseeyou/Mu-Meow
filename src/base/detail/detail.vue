<template>
    <transition name="detail">
        <div class="detail-wrapper" ref="detail">
            <!-- 歌词详情页 -->
            <div class="lyric-wrapper">
                <!-- 头部 -->
                <div class="head-wrap">
                    <div class="head">
                        <div class="back-wrap" @click="back"><a class="back-btn"></a></div>
                        <div class="play-title">{{ musicDetail.name }}</div>
                        <div class="share-wrap" @click="shareLink"><a class="share-btn"></a></div>
                    </div>
                </div>
                <!-- 歌词海报 -->
                <div class="play-video">
                    <div class="slider-wrap">
                        <slider>
                            <div class="lines-poster" v-for="poster in postersArr.posters">
                                <img class="slider-poster" :src="poster">
                            </div>
                        </slider>
                        <i @click="togglePlaying" class="play-bar" ref="playIcon"></i>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formate(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{ formate(duration) }}</span>
                    </div>
                    <audio :src="musicDetail.sourceUrl" ref="audio" @canplay="ready" @timeupdate="uptateTime"
                           @ended="end"></audio>
                </div>
                <!-- 歌词导航 -->
                <div class="lyric-tab">
                    <div class="lines-text">
                        <span v-show="lyricTab == 0" class="line-title">电影歌词</span>
                        <span v-show="lyricTab == 1" class="line-title">电影故事</span>
                    </div>
                    <div class="movie-lyric" @click="lyricTab = 0">
                        <span class="line-lyric" :class="lyricTab == 0 ? 'clickLyric' : ''"></span>
                    </div>
                    <div class="movie-lyric" @click="lyricTab = 1">
                        <span class="line-story" :class="lyricTab == 1 ? 'clickStory' : ''"></span>
                    </div>
                </div>
                <!-- 间隙 -->
                <div class="space"></div>
                <!-- 歌词内容 -->
                <div class="lyric-content">
                    <div class="text-sty" v-show="lyricTab == 0">
                        <p class="sing-text lyric-text" v-html="musicDetail.lyric"></p>
                        <none-data v-show="!musicDetail.lyric"></none-data>
                    </div>
                    <div class="text-sty" v-show="lyricTab == 1">
                        <p class="sing-text" v-html="musicDetail.summary"></p>
                        <none-data v-show="!musicDetail.summary"></none-data>
                    </div>
                    <!-- 胶片背景 -->
                    <div class="space"></div>
                    <div class="comment-list">
                        <div class="lines-text">
                            <div class="comment-tilte clearfix">
                                <span class="icon-rat-bar fl"></span>
                                <span class="fl">评论列表</span>
                            </div>
                            <!-- 评论列表页 -->
                            <div v-for="comment in musicDetail.ratings" class="ratings-list">
                                <div class="clearfix">
                                    <div class="user-portrait fl">
                                        <img :src="musicDetail.poster">
                                    </div>
                                    <div class="user-info fr">
                                        <div class="user-name clearfix">
                                            <span class="fl">{{ comment.username }}</span>
                                            <span class="fabu-num fr">{{ comment.thumbs }}</span>
                                            <span class="icon-thumbs-bar fr"
                                                  :class="comment.myIsPraise ? 'clickThumbs' : ''"
                                                  @click="commentLike(comment)">
                                        </span>
                                        </div>
                                        <p class="rat-date">{{ comment.rateTime }}</p>
                                        <p class="change-sty">{{ comment.content }}</p>
                                    </div>
                                </div>
                            </div>
                            <none-data v-show="musicDetail.ratings == 0"></none-data>
                        </div>
                    </div>
                </div>
                <!-- 底部固定 -->
                <div class="rat-footer">
                    <div class="rat-left">
                        <span class="left-bar icon-write-bar" @click="writeComment"></span>
                        <span class="left-bar icon-collect-bar"
                              :class="musicDetail.myIsCollect ? 'clickCollect' : ''"
                              @click="musicCollect(musicDetail)">
                    </span>
                        <span class="left-bar icon-thumbs-bar"
                              :class="musicDetail.myIsPraise ? 'clickThumbs' : ''"
                              @click="musicLike(musicDetail)">
                    </span>
                    </div>
                    <div class="rat-middle"></div>
                    <div class="rat-right">
                        <span class="right-bar">{{ musicDetail.thumbs }} 赞</span>
                        <span class="right-bar">{{ musicDetail.total }} 评论</span>
                    </div>
                </div>
            </div>
            <!-- 评论弹层 -->
            <div v-show="isFlag" class="write-rat">
                <div class="write-content">
                    <textarea class="write-pl" placeholder="在这里写下你想说的话"
                              @input="textareaText" v-model="commentContent">
                    </textarea>
                    <p class="textarea-text"><span class="text-ctrl">{{remnant}}</span>/100</p>
                </div>
                <div class="write-relace fr">
                    <span class="write-relace-btn" @click="release(musicDetail)">发布</span>
                </div>
                <i class="write-close" @click="hideLayer"></i>
            </div>
            <!-- 分享层 -->
            <share v-show="layer" @close="close"></share>
            <!-- 遮罩 -->
            <div v-show="flag" class="layer" ref="layer" @touchmove.prevent></div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import NoneData from 'base/none-data/none-data';
    import Slider from 'base/slider/slider';
    import Share from 'base/share/share';
    import ProgressBar from 'base/progress-bar/progress-bar';
    import {requestData, ERR_OK} from 'api/request';
    import {isLike} from 'src/api/isLike';
    import {isCollect} from 'src/api/isCollect';
    import {params} from 'src/api/params';

    const NAV_HEIGHT = 98;
    const RELEASE_URL = 'http://api.mumiao.distspace.com/web/m2/insertComment.do';
    const QUERY_URL = 'http://api.mumiao.distspace.com/web/m2/getComment.do';

    export default{
        data(){
            return {
                lyricTab: 0,
                remnant: 0,
                duration: 0,
                currentTime: 0,
                songReady: false,
                flag: false,
                isFlag: false,
                layer: false,
                hotComment: {},
                commentContent: "",
            }
        },
        props: {
            musicDetail: {
                type: Object,
                default: null
            },
            postersArr: {}
        },
        computed: {
            percent(){
                return this.currentTime / this.duration;
            },
        },
        methods: {
            // 返回
            back(){
                this.$router.back();
                this.$refs.audio.currentTime = 0;
                this.$refs.playIcon.className = 'play-bar';
            },
            // 分享
            shareLink(){
                this._layer();
                this.layer = true;
            },
            // 关闭分享
            close(){
                this.flag = false;
                this.layer = false;
            },
            // 显示输入框
            writeComment(){
                if (localStorage.USERINFO) {
                    this._layer();
                    this.isFlag = true;
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
            // 字数限制
            textareaText(){
                this.remnant = this.commentContent.length;
                if (this.remnant > 100) {
                    this.remnant = 100;
                    this.commentContent = this.commentContent.substr(0, 100);
                    alert("您最多只能输入100个字哦,亲");
                }
            },
            // 发布
            release(music){
                requestData(RELEASE_URL, {
                    targetId: music.id,
                    commentText: this.commentContent,
                    commentType: params.musicComment,
                    accountId: params.accountId,
                    accessToken: params.accessToken
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.hideLayer();
                        this.commentContent = "";
                        requestData(QUERY_URL, {
                            targetId: music.id,
                            page: params.page,
                            pageSize: params.pageSize,
                            targetType: params.musicComment,
                            accountId: params.accountId,
                            accessToken: params.accessToken
                        }).then((res) => {
                            if (res.code === ERR_OK) {
                                this.hotComment = res.data;
                                // 将评论信息追加到评论信息列表
                                this.musicDetail.ratings.unshift(this.hotComment[0]);
                            }
                        })
                    }
                })
            },
            // 隐藏输入框
            hideLayer(){
                this.flag = false;
                this.isFlag = false;
                this.remnant = 0;
                this.commentContent = "";
            },
            // 评论点赞
            commentLike(_comment){
                this._callFn(isLike, _comment, params.commentLike);
                //isLike(_comment, params.commentLike);
            },
            // 音乐点赞
            musicLike(_music){
                this._callFn(isLike, _music, params.musicLike);
                //isLike(_music, params.musicLike);
            },
            // 收藏
            musicCollect(_music){
                this._callFn(isCollect, _music, params.musicCollect);
                //isCollect(_music, params.musicCollect);
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
            // 音频准备就绪
            ready(){
                this.songReady = true;
                if (this.songReady) {
                    this.duration = this.$refs.audio.duration;
                }
            },
            // 播放切换
            togglePlaying(){
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play();
                    this.$refs.playIcon.className = 'pause-bar';
                }
                else {
                    this.$refs.audio.pause();
                    this.$refs.playIcon.className = 'play-bar';
                }
            },
            // 更新播放时间
            uptateTime(e){
                this.currentTime = e.target.currentTime;
            },
            // 拖动进度
            onProgressBarChange(percent){
                this.$refs.audio.currentTime = this.duration * percent;
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play();
                    this.$refs.playIcon.className = 'pause-bar';
                }
                this.$refs.audio.play();
            },
            // 播放到结尾
            end(){
                this.$refs.audio.pause();
                this.$refs.playIcon.className = 'play-bar';
            },
            // 规范时间
            formate(interval){
                interval = interval | 0   // | 0 是向下取整的意思
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            // 规范字符串
            _pad(num, n = 2){  // n代表字符串的第2位开始 补0
                let len = num.toString().length;
                while (len < n) {
                    num = '0' + num;
                    len++
                }
                return num;
            },
            // 浮层
            _layer(){
                let detailHeight = this.$refs.detail.clientHeight;
                this.$refs.layer.style.height = detailHeight + NAV_HEIGHT + 'px';
                this.flag = true;
            }
        },
        components: {
            NoneData,
            Slider,
            Share,
            ProgressBar
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .lyric-wrapper {
        .play-video {
            .lines-poster {
                width: 100%;
                height: 100%;
                position: relative;
                & > img {
                    width: 100%;
                    height: 400px;
                }
            }
            .play-bar, .pause-bar {
                width: 100px;
                height: 100px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -50px;
                margin-top: -50px;
            }
            .play-bar {
                background-image: url("img/music-play.png");
            }
            .pause-bar {
                background-image: url("img/music-pause.png");
            }
            .slider-wrap {
                position: relative;
            }
        }
        .progress-wrapper {
            display: flex;
            height: 80px;
            margin: 0px 30px;
            align-items: center;
            .time {
                flex: 1;
                color: #333;
                font-size: 24px;
                line-height: 30px;
            }
            .time-l {
                text-align: left;
            }
            .time-r {
                text-align: right;
            }
            .progress-bar-wrapper {
                flex: 8
            }
        }
        .lyric-tab {
            display: flex;
            font-size: 36px;
            margin: 20px 30px 30px 30px;
            .lines-text {
                flex: 8;
            }
            .line-title {
                display: inline;
                position: relative;
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
            .movie-lyric {
                flex: 1;
            }
        }
        .text-sty {
            color: #5D5D5D;
            font-size: 26px;
            line-height: 70px;
            box-sizing: border-box;
            margin: 40px 30px;
            .sing-text {
                text-indent: 2em;
            }
            .lyric-text {
                text-align: center;
            }
        }
        .line-lyric, .line-story {
            display: block;
            width: 40px;
            height: 40px;
            margin-left: 40px;
            text-align: right;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .line-lyric {
            background-image: url("img/lyric-nc.png");
        }
        .line-lyric.clickLyric {
            background-image: url("img/lyric-c.png");
        }
        .line-story {
            background-image: url("img/lines-nc.png");
        }
        .line-story.clickStory {
            background-image: url("img/lines-c.png");
        }
        .comment-tilte {
            font-size: 36px;
            margin: 40px 0;
        }
        .comment-list {
            margin-left: 30px;
        }
        .ratings-list {
            margin-bottom: 40px;
            position: relative;
            .user-portrait {
                width: 100px;
                height: 100px;
                & > img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1px solid #ededed;
                }
            }
            .user-info {
                width: calc(100% - 20px);
                line-height: 26px;
                color: #5D5D5D;
                .user-name {
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 30px;
                    margin-bottom: 5px;
                }
                .rat-date {
                    font-size: 24px;
                    color: #959595;
                }
                & > span {
                    display: inline-block;
                }
                &:after {
                    content: '';
                    display: block;
                    height: 1px;
                    width: 100%;
                    background: rgb(237, 237, 237);
                }
            }
            .fabu-num {
                font-size: 24px;
                margin-top: 5px;
                margin-right: 30px;
            }
            .change-sty {
                font-size: 28px;
                line-height: 50px;
                margin: 20px 30px 20px 0;
            }
        }
        .rat-footer {
            height: 98px;
            line-height: 98px;
            width: 100%;
            display: flex;
            background: #FFF;
            position: fixed;
            bottom: 0;
            left: 0;
            border-top: 1px solid rgba(237, 237, 237, 0.8);
            z-index: 11;
            .rat-left {
                flex: 5;
                display: flex;
                &:first-child {
                    padding-left: 30px;
                }
            }
            .rat-middle {
                flex: 1;
            }
            .rat-right {
                font-size: 30px;
                flex: 4;
                display: flex;
                color: #aaaaaa;
            }
            .right-bar, .left-bar {
                flex: 1;
                display: block;
                font-weight: normal;
            }
            .left-bar {
                font-size: 30px;
                text-align: left;
                margin-top: 20px;
            }
            .right-bar {
                text-align: right;
                font-size: 24px;
                position: relative;
                &:last-child {
                    padding-right: 30px;
                }
                &:after {
                    content: '';
                    display: block;
                    width: 1px;
                    height: 28px;
                    background: rgba(237, 237, 237, 0.8);
                    position: absolute;
                    right: -28px;
                    top: 32px;
                }
            }
        }
    }

    .write-rat {
        width: 100%;
        position: fixed;
        top: 50%;
        margin-top: -150px;
        box-sizing: border-box;
        z-index: 24;
        .write-content {
            height: 300px;
            margin: 30px;
            padding: 20px;
            font-size: 30px;
            border-radius: 10px;
            border: 1px solid #bfbfbf;
            background: #ffffff;
            overflow: hidden;
            position: relative;
            .write-pl {
                width: 100%;
                height: 100%;
                line-height: 50px;
                font-size: 30px;
                border: none;
                outline: none;
                resize: none;
                color: #333;
                overflow: hidden;
            }
        }
        .textarea-text {
            bottom: 30px;
            right: 40px;
            font-size: 24px;
            color: #aaaaaa;
            position: absolute;
            .text-ctrl {
                display: inline-block;
            }
        }
        .write-relace {
            width: 100px;
            height: 60px;
            line-height: 60px;
            margin: 0 30px 10px 0;
            background: #161619;
            border-radius: 8px;
            .write-relace-btn {
                text-align: center;
                color: #fff;
                font-size: 26px;
            }
        }
        .write-close {
            width: 40px;
            height: 40px;
            position: absolute;
            right: 30px;
            top: -30px;
            z-index: 21;
            background: url("img/write-close.png") no-repeat;
            background-size: 100% 100%;
        }
    }

    .detail-enter-active, .detail-leave-active {
        transition: all 0.3s;
    }

    .detail-enter, .detail-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>