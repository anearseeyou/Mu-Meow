<template>
    <!-- 原声音乐 -->
    <div class="music-wrap">
        <div class="ori-music" v-for="(music,index) in homeData.music">
            <!-- 胶片背景 -->
            <div class="film-bg"></div>
            <div class="mb40 pauto">
                <div class="ori-title">- 电影原声 -</div>
                <div class="music-info">
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
            <div class="music-bar">
                <span class="icon-share-bar"></span>
                <span class="icon-collect-bar"></span>
                <span class="icon-thumbs-bar">
                    <i class="thumbs-num">{{ music.thumbs }}</i>
                </span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            homeData: {}
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/less/index";
</style>