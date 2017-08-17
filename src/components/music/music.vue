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
                        <router-link to="/homepage/music/mucdetail" class="music-poster">
                            <img src="../../../static/img/music-poster.png">
                            <div class="music-play"></div>
                        </router-link>
                        <div class="text-bg clearfix"></div>
                    </div>
                </div>
            </div>
            <div class="music-bar">
                <span class="icon-share-bar"></span>
                <span class="icon-collect-bar"
                      @click="musicCollect(music)"
                      :class="music.myIsCollect ? 'clickCollect' : ''">
                </span>
                <span class="icon-thumbs-bar"
                      @click="musicThubmsUp(music)"
                      :class="music.myIsPraise ? 'clickThumbs' : ''">
                    <i class="thumbs-num">{{ music.thumbs }}</i>
                </span>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {thumbsUp} from 'src/api/thumbsUp';
    import {collection} from 'src/api/collect'
    export default{
        props: {
            homeData: {}
        },
        methods: {
            musicThubmsUp(_music){
                if (_music.myIsPraise == false) {
                    thumbsUp(
                        {
                            praiseType: 3, accountId: 1, targetId: _music.id,
                            accessToken: 'c89659c38becc80574d638706b018f40'
                        })
                        .then(() => {
                            _music.myIsPraise = true;
                            _music.thumbs++;
                        })
                }
            },
            musicCollect(_music){
                if (_music.myIsCollect == false) {
                    collection(
                        {
                            collectTargetId: _music.id, collectType: 1, accountId: 1,
                            paramType: 1,
                            accessToken: "c89659c38becc80574d638706b018f40"
                        })
                        .then(() => {
                            _music.myIsCollect = true;
                        })
                }
                else if (_music.myIsCollect) {
                    collection(
                        {
                            collectTargetId: _music.id, collectType: 1, accountId: 1,
                            paramType: 2,
                            accessToken: "c89659c38becc80574d638706b018f40"
                        })
                        .then(() => {
                            _music.myIsCollect = false;
                        })
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../common/less/index";
</style>