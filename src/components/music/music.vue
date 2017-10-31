<template>
    <div class="music-list">
        <!-- 音乐列表 -->
        <music-list :music-list="homeData"></music-list>
        <!-- 暂无数据 -->
        <none-data v-if="homeData.music" v-show="!homeData.music.length"></none-data>
        <!-- 加载更多 -->
        <more-data v-show="homeData.music != 0" @loadMore="loadMore" :more-data="moreData"></more-data>
    </div>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'base/music-list/music-list';
    import NoneData from 'base/none-data/none-data';
    import MoreData from 'base/more-data/more-data';
    import {requestData, ERR_OK} from 'src/api/request';
    import {params} from 'src/api/params';

    const URL = 'http://192.168.0.244:8081/web/m2/getMovieMusicByPage.do';

    export default{
        data(){
            return {
                morePage: 2,
                moreData: {}
            }
        },
        props: {
            homeData: {
                type: Object,
                default: null,
            }
        },
        methods: {
            // 加载更多
            loadMore(){
                requestData(URL, {
                    page: this.morePage++,
                    pageSize: params.morePageSize,
                    movieId: this.homeData.id,
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.moreData = res.data;
                        for (let i = 0, len = this.moreData.length; i < len; i++) {
                            this.homeData.music.push(this.moreData[i]);
                        }
                    }
                })
            },
        },
        components: {
            MusicList,
            NoneData,
            MoreData,
        }
    }
</script>
