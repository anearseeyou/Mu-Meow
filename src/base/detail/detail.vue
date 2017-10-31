<template>
    <transition name="detail">
        <!-- 歌词详情页 -->
        <div class="lyric-wrapper">
            <!-- 头部 -->
            <div class="head-wrap">
                <div class="head">
                    <div class="back-wrap" @click="back"><a class="back-btn"></a></div>
                    <div class="play-title">{{ musicDetail.name }}</div>
                    <div class="share-wrap" @share="share"><a class="share-btn"></a></div>
                </div>
            </div>
            <!-- 歌词海报 -->
            <div class="play-video">
                <div class="lines-poster">
                    <img :src="musicDetail.poster">
                    <i class="play-bar"></i>
                </div>
                <div class="control clearfix">
                    <span class="fl">01:00</span>
                    <span class="fl ctrl-bar"><i class="mask-bar"></i></span>
                    <span class="fr">04:22</span>
                </div>
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
            <!-- 背景 -->
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
                                    <img :src="musicDetail.avatar">
                                </div>
                                <div class="user-info fr">
                                    <div class="user-name clearfix">
                                        <span class="fl">{{ comment.username }}</span>
                                        <span class="fabu-num fr">{{ comment.thumbs }}</span>
                                        <span class="icon-thumbs-bar fr"></span>
                                    </div>
                                    <p class="rat-date">{{ comment.rateTime }}</p>
                                    <p class="text-sty change-sty">{{ comment.content }}</p>
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
                    <span class="left-bar icon-write-bar"></span>
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
        <!-- 分享弹层 -->
        <!--<div v-show="flag" class="float-layer"></div>-->
        <!--<div v-show="flag" class="share-layer">
            <div class="share-to font48">分享到</div>
            <div class="share-link">
                <a class="share-link-to" href="javascript:;">
                    <span class="share-toqq"></span><br>
                    <em>QQ</em>
                </a>
                <a class="share-link-to" href="javascript:;">
                    <span class="share-tofr"></span><br>
                    <em>朋友圈</em>
                </a>
                <a class="share-link-to" href="javascript:;">
                    <span class="share-towb"></span><br>
                    <em>微博</em>
                </a>
                <a class="share-link-to" href="javascript:;">
                    <span class="share-towx"></span><br>
                    <em>微信好友</em>
                </a>
            </div>
            <div class="share-close">
                <i @click="shareLink" class="share-close-bar"></i>
            </div>
        </div>-->
        <!-- 写评论弹层 -->
        <!--<div v-show="isRatingsShow" class="write-rat">
            <div class="write-content">
                        <textarea class="text-sty none-indent write-pl" placeholder="在这里写下你想说的话"
                                  @input="textareaText" v-model="ratContent">
                        </textarea>
                <p class="textarea-text"><span class="text-ctrl">{{remnant}}</span>/100</p>
            </div>
            <div class="write-relace fr">
                <span class="write-relace-btn" @click="musicRatings(music)">发布</span>
            </div>
            <i class="write-close" @click="hideLayer"></i>
        </div>-->
    </transition>
</template>

<script type="text/ecmascript-6">
    import NoneData from 'base/none-data/none-data';
    import {isLike} from 'src/api/isLike'
    import {isCollect} from 'src/api/isCollect'

    export default{
        data(){
            return {
                lyricTab: 0,
            }
        },
        props: {
            musicDetail: {
                type: Object,
                default: null
            }
        },
        methods: {
            // 返回
            back(){
                this.$router.back();
            },
            share(){

            },
            // 点赞
            musicLike(_music){
                isLike(_music, params.musicLike);
            },
            // 收藏
            musicCollect(_music){
                isCollect(_music, params.musicCollect);
            }
        },
        components: {
            NoneData
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
        }
        .control {
            font-size: 24px;
            padding: 30px;
            color: #5d5d5d;
            box-sizing: border-box;
            .ctrl-bar {
                width: 500px;
                height: 5px;
                margin-left: 30px;
                top: 10px;
                background: #dfdfdf;
                position: relative;
                border-radius: 0.2rem;
                &:after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    left: 50px;
                    top: -3px;
                    border-radius: 50%;
                    background-color: #161619;
                }
                .mask-bar {
                    width: 200px;
                    height: 5px;
                    display: block;
                    background-color: #161619;
                    position: absolute;
                    border-radius: 0.2rem;
                }
            }
        }
        .lyric-tab {
            display: flex;
            font-size: 36px;
            margin: 40px 30px 40px 30px;
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
                    font-size: 34px;
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
                    background: rgba(237, 237, 237, .5);
                }
            }
            .fabu-num {
                font-size: 24px;
                margin-top: 5px;
                margin-right: 30px;
            }
            .change-sty {
                margin-right: 30px;
                margin-bottom: 10px;
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

    .detail-enter-active, .detail-leave-active {
        transition: all 0.3s;
    }

    .detail-enter, .detail-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>