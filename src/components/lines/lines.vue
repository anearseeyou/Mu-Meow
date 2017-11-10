<template>
    <div class="lines-wrapper">
        <lines-list :lines-list="homeData"></lines-list>
        <!-- 暂无数据 -->
        <none-data v-if="homeData.lines" v-show="!homeData.lines.length"></none-data>
        <!-- 加载更多 -->
        <more-data v-show="homeData.lines != 0" @loadMore="loadMore" :more-data="moreData"></more-data>
    </div>
</template>

<script type="text/ecmascript-6">
    import LinesList from 'base/lines-list/lines-list';
    import NoneData from 'base/none-data/none-data';
    import MoreData from 'base/more-data/more-data';
    import {requestData, ERR_OK} from 'src/api/request';
    import {params} from 'src/api/params';

    const URL = 'http://api.mumiao.distspace.com/web/m2//getMoviePropertyByPage.do';

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
                            this.homeData.lines.push(this.moreData[i]);
                        }
                    }
                })
            },
            // 更新列表
            _updateMusicList(){
                requestData(URL, {
                    page: params.page,
                    pageSize: params.morePageSize,
                    movieId: this.homeData.id,
                    accountId: params.accountId,
                    accessToken: params.accessToken
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.homeData.lines = res.data;
                        // console.log(this.homeData.music);
                    }
                })
            }
        },
        components: {
            LinesList,
            NoneData,
            MoreData
        },
        watch: {
            $route(){
                this._updateMusicList();
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>