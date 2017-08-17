<template>
    <!-- 歌词详情页 -->
    <div class="music-wrapper">
        <div class="play-details">
            <!-- 头部 -->
            <div class="backHome">
                <div class="back-btn"><a class="back-bg" @click="backHome"></a></div>
                <div class="play-title">{{ music.name }}</div>
                <div class="write-btn share-btn"><a @click="shareLink" class="icon-share-bar"></a></div>
            </div>
            <!-- 歌词海报 -->
            <div class="play-video">
                <video class="lines-poster"
                       :poster="music.poster == true ? music.poster : '../img/lines-poster.png'">
                </video>
                <i class="play-bar"></i>
                <div class="control clearfix">
                    <span class="fl">01:00</span>
                    <span class="fl ctrl-bar"><i class="mask-bar"></i></span>
                    <span class="fr">04:22</span>
                </div>
            </div>
            <!-- 歌词导航 -->
            <div class="lines-tab indent-sty">
                <div class="lines-text">
                    <span v-show="detailsNav == 0" class="line-title">电影歌词</span>
                    <span v-show="detailsNav == 1" class="line-title">电影故事</span>
                </div>
                <div class="lines-movie" @click="detailsNav = 0">
                    <span :class="detailsNav == 0 ? 'line-lyric clickLyric' : 'line-lyric'"></span>
                </div>
                <div class="lines-movie" @click="detailsNav = 1">
                    <span :class="detailsNav == 1 ? 'line-story clickStory' : 'line-story'"></span>
                </div>
            </div>
            <!-- 胶片背景 -->
            <div class="film-bg"></div>
            <!-- 歌词内容 -->
            <div v-show="detailsNav == 0" class="lyric-content">
                <div class="sing-lines indent-sty text-sty">
                    <!-- 歌词 -->
                    <p class="sing-text">{{ music.lyric }}</p>
                </div>
                <!-- 胶片背景 -->
                <div class="film-bg"></div>
                <div class="spacing indent-sty">
                    <div class="lines-text ">
                        <div class="clearfix ratings-title">
                            <span class="icon-rat-bar fl"></span>
                            <span class="line-title rat-list fl ">评论列表</span>
                        </div>
                        <!-- 评论列表页 -->
                        <div v-for="rat in music.ratings" class="ratings-list">
                            <div class="user-u change-u clearfix">
                                <div class="user-portrait fl">
                                    <img :src="rat.avatar ? rat.avatar : '../img/delete/user-avart.png'"
                                         :alt="rat.username">
                                </div>
                                <div class="user-info fl">
                                    <span class="user-name">{{ rat.username ? rat.username : '齐儿'}}</span>
                                    <span class="rat-date">{{ rat.rateTime }}</span>
                                </div>
                            </div>
                            <div class="rat-text">
                                <p class="text-sty change-sty">{{ rat.content }}</p>
                            </div>
                            <div class="rat-bar clearfix">
                                <div class="fr">
                                        <span class="icon-thumbs-bar fl"
                                              :class="rat.myIsPraise ? 'clickThumbs' : '' "
                                              @click="musicDetailsThubmsUp(rat)">
                                        </span>
                                    <span class="fabu-num fl">{{ rat.thumbs }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 故事内容 -->
            <div v-show="detailsNav == 1" class="lyric-content">
                <div class="sing-lines indent-sty text-sty">
                    <p class="sing-text sing-content">{{ movieData.content }}</p>
                </div>
                <!-- 胶片背景 -->
                <div class="film-bg"></div>
                <div class="spacing indent-sty">
                    <div class="lines-text ">
                        <div class="clearfix ratings-title">
                            <span class="icon-rat-bar fl"></span>
                            <span class="line-title rat-list fl ">评论列表</span>
                        </div>
                        <!-- 评论列表页 -->
                        <div v-for="rat in music.ratings" class="ratings-list">
                            <div class="user-u change-u clearfix">
                                <div class="user-portrait fl">
                                    <img :src="rat.avatar ? rat.avatar : '../img/delete/user-avart.png'"
                                         :alt="rat.username">
                                </div>
                                <div class="user-info fl">
                                    <span class="user-name">{{ rat.username ? rat.username : '齐儿'}}</span>
                                    <span class="rat-date">{{ rat.rateTime }}</span>
                                </div>
                            </div>
                            <div class="rat-text">
                                <p class="text-sty change-sty">{{ rat.content }}</p>
                            </div>
                            <div class="rat-bar clearfix">
                                <div class="fr">
                                        <span class="icon-thumbs-bar fl"
                                              :class="rat.myIsPraise ? 'clickThumbs' : '' "
                                              @click="musicDetailsThubmsUp(rat)">
                                        </span>
                                    <span class="fabu-num fl">{{ rat.thumbs }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部固定 -->
            <div class="rat-footer">
                <div class="rat-left">
                        <span class="left-bar icon-collect-bar"
                              :class="music.myIsCollect ? 'clickCollect' : ''"
                              @click="musicDetailsCollect(music)">
                        </span>
                    <span class="left-bar icon-thumbs-bar"
                          :class="music.myIsPraise ? 'clickThumbs' : ''"
                          @click="musicDetailsThumbs(music)">
                        </span>
                    <span class="left-bar icon-write-bar"
                          @click="showLayer"></span>
                </div>
                <div class="rat-middle"></div>
                <div class="rat-right">
                    <span class="right-bar">{{ music.thumbs }}赞</span>
                    <span class="right-bar">{{ music.total }}评论</span>
                </div>
            </div>
        </div>
        <!-- 分享弹层 -->
        <div v-show="flag" class="float-layer"></div>
        <div v-show="flag" class="share-layer">
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
        </div>
        <!-- 写评论弹层 -->
        <div v-show="isRatingsShow" class="write-rat">
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
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            music: Object
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>