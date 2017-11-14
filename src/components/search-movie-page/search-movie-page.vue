<template>
    <div class="search-movie-page">
        <!-- 首页头部 -->
        <div class="head-wrap">
            <div class="head">
                <div class="back-wrap" @click="back"><a class="back-btn"></a></div>
                <span class="search-movie-title">{{ movieData.name }}</span>
                <div class="back-wrap"></div>
            </div>
        </div>
        <!-- 电影海报 -->
        <div class="search-banner">
            <img :src="movieData.poster" class="poster">
        </div>
        <!-- 上映时间 -->
        <div class="banner-info">
            <span class="deliveryTime">上映时间：{{ movieData.release }}</span>
            <span class="score">豆瓣评分：7.7分</span>
        </div>
        <!-- 剧情简介 -->
        <div class="movie-summary">
            <div class="summary">剧情简介</div>
            <p class="text">{{ movieData.content }}</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Share from 'base/share/share';
    import {requestData, ERR_OK, URL_PREFIX} from 'api/request';
    import {params} from 'api/params';

    const URL = URL_PREFIX + 'getMovieDetail.do';

    export default{
        data(){
            return {
                flag: false,
                movieData: {}
            }
        },
        created(){
            this._loadMovieData();
        },
        methods: {
            back(){
                this.$router.push({
                    name: 'search-list'
                })
            },
            _loadMovieData(){
                if (this.$route.params.movie) {
                    requestData(URL, {
                        movieId: this.$route.params.movie.id,
                        accountId: params.accountId
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            this.movieData = res.data;
                        }
                    })
                }
            }
        },
        components: {
            Share,
        },
        watch: {
            $route(){
                this._loadMovieData();
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .search-movie-page {
        .search-movie-title {
            flex: 8;
        }
        .search-banner {
            margin: 30px;
            & > .poster {
                width: 100%;
                height: 100%;
            }
        }
        .movie-summary {
            margin: 0 30px;
            line-height: 60px;
            .summary {
                font-size: 30px;
                color: #aaaaaa;
            }
            .text {
                font-size: 28px;
                text-indent: 2em;
            }
        }
    }

</style>