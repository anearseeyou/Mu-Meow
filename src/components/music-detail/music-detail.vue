<template>
    <!-- 歌词详情页 -->
    <div class="lyric-wrapper">
        <!-- 歌词头部 -->
        <div class="back-home">
            <span class="back-btn" @click="backList"></span>
            <p class="fz40">{{musicDetail.name}}</p>
            <span class="share-btn"></span>
        </div>
        <!-- 歌词海报 -->
        <div class="play-video">
            <video class="lines-poster" poster="../../../static/img/lines-poster.png"></video>
            <i class="play-bar"></i>
            <div class="control clearfix">
                <span class="fl">01:00</span>
                <span class="fl ctrl-bar"><i class="mask-bar"></i></span>
                <span class="fr">04:22</span>
            </div>
        </div>
        <!-- 歌词导航 -->
        <div class="lyric-tab indent-sty">
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
            <div class="sing-lines indent-sty text-sty">
                <!-- 歌词 -->
                <p v-show="lyricTab == 0" class="sing-text">{{ musicDetail.lyric }}</p>
                <p v-show="lyricTab == 1" class="sing-text sing-content">{{musicDetail.summary}}</p>
            </div>
            <!-- 胶片背景 -->
            <div class="space"></div>
            <div class="comment-list">
                <div class="lines-text ">
                    <div class="clearfix mb40">
                        <span class="icon-rat-bar fl"></span>
                        <span class="fz40 fl ">评论列表</span>
                    </div>
                    <!-- 评论列表页 -->
                    <div v-for="comment in musicDetail.ratings" class="ratings-list">
                        <div class="clearfix">
                            <div class="user-portrait fl">
                                <img src="../../../static/img/user-avart.png">
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
</template>

<script type="text/ecmascript-6">
    import {requestData} from 'src/api/request'
    import {isLike} from 'src/api/isLike'
    import {isCollect} from 'src/api/isCollect'
    import {params} from 'src/api/params'
    export default{
        data(){
            return {
                lyricTab: 0,
                musicDetail: {},
                musicDetailUrl: "http://192.168.0.244:8081/web/m2/getMovieMusicDetail.do",
            }
        },
        mounted(){
            this.musicDetailData();
        },
        methods: {
            // 获取数据
            musicDetailData(){
                if (this.$route.params.id) {
                    requestData(this.musicDetailUrl,
                        {
                            musicId: this.$route.params.id,
                            accountId: params.accountId,
                            accessToken: params.accessToken
                        })
                        .then((res) => {
                            this.musicDetail = res.data;
                        });
                }
            },
            // 返回
            backList(){
                this.$router.go(-1);
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
        watch: {
            '$route': 'musicDetailData',
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/less/index";

    .lyric-wrapper {
        .back-home {
            width: 100%;
            height: 88px;
            line-height: 88px;
            color: #ffffff;
            position: relative;
            text-align: center;
            background: #151519;
            box-sizing: border-box;
            .share-btn {
                width: 30px;
                height: 30px;
                position: absolute;
                top: 29px;
                right: 30px;
                background: url("img/share-nc.png") no-repeat;
                background-size: 100% 100%;
            }
        }
        .play-video {
            position: relative;
            .lines-poster {
                width: 100%;
                height: 100%;
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
                margin-top: -130px;
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
            font-size: 40px;
            margin-top: 40px;
            margin-bottom: 40px;
            .lines-text {
                flex: 8;
            }
            .line-title {
                font-size: 40px;
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
        .line-lyric, .line-story {
            display: block;
            width: 40px;
            height: 40px;
            margin-left: 40px;
            text-align: right;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        // 歌词
        .line-lyric {
            background-image: url("img/lyric-nc.png");
        }
        .line-lyric.clickLyric {
            background-image: url("img/lyric-c.png");
        }
        // 故事
        .line-story {
            background-image: url("img/lines-nc.png");
        }
        .line-story.clickStory {
            background-image: url("img/lines-c.png");
        }
    }
</style>