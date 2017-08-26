<template>
    <!-- 原声音乐 -->
    <div class="music-wrap">
        <div class="ori-music" v-for="(music,index) in homeData.music">
            <!-- 间隙 -->
            <div class="space"></div>
            <!-- 内容 -->
            <div class="mb40 pauto">
                <div class="ori-title">- 电影原声 -</div>
                <div class="music-info" @click="goMusicDetails(music.id)">
                    <p class="music-name">{{ music.name }}</p>
                    <p class="music-sing mb40">{{ music.singer }}</p>
                    <div class="music-rotate ">
                        <div class="music-circle"></div>
                        <a class="music-poster">
                            <img src="../../../static/img/music-poster.png">
                            <div class="music-play"></div>
                        </a>
                        <div class="text-bg clearfix"></div>
                    </div>
                </div>
            </div>
            <!-- 操作 -->
            <div class="music-bar">
                <span class="icon-share-bar"></span>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import {isLike} from 'src/api/isLike';
    import {isCollect} from 'src/api/isCollect';
    import {params} from 'src/api/params'
    export default{
        props: {
            type: Object,
            homeData: {},
        },
        methods: {
            // 点赞
            musicLike(music){
                isLike(music, params.musicLike);
            },
            // 收藏
            musicCollect(music){
                isCollect(music, params.musicCollect);
            },
            // 跳转详情页
            goMusicDetails(musicId){
                this.$router.push({name: 'musicdetail', params: {id: musicId}});
            },
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/less/index";
</style>