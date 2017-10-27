<template>
    <div class="more-data">
        <!--<p @click="loadMore(movieId)" class="load-more">点我！加载更多</p>-->
        <!--<p class="none-more">艾玛！用力过猛</p>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {requestData} from 'api/request';
    import {ERR_OK} from 'api/request';
    import {params} from 'api/params';

    const URL = 'http://192.168.0.244:8081/web/m2/getMovieMusicByPage.do';

    export default{
        data(){
            return {
                moreData: {}
            }
        },
        props: {
            movieId: {
                type: Number,
                default: 0
            }
        },
        methods: {
            loadMore(movieId){
                requestData(URL, {
                    page: params.morePage++,
                    pageSize: params.morePageSize,
                    accountId: params.accountId,
                    movieId: movieId
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.moreData = res.data;
                        this.$emit('moreData', this.moreData);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .more-data {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        text-align: center;
        background: rgba(237, 237, 237, 0.2);
    }
</style>