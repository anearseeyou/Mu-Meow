<template>
    <div class="search-list">
        <!-- 头部 -->
        <div class="head-wrap">
            <div class="head">
                <div class="back-wrap" @click="back"><a class="back-btn"></a></div>
                <div class="search-input">
                    <input v-model="searchContent" type="text" placeholder="搜一搜">
                </div>
                <div class="search-bar" @click="search"><a class="search-btn"></a></div>
            </div>
        </div>
        <!-- 搜索结果-->
        <div class="tab">
            <div class="tab-list" @click="tabChange = 0">
                <span class="tab-text" :class="tabChange == 0 ? 'cur-underline' : ''">电影</span>
            </div>
            <div class="tab-list" @click="tabChange = 1">
                <span class="tab-text" :class="tabChange == 1 ? 'cur-underline' : ''">音乐</span>
            </div>
        </div>
        <!-- 电影 -->
        <div v-show="tabChange == 0">
            <div class="search-music"
                 v-for="movie in searchData.movie"
                 @click="moviePage(movie)">
                <div class="search-pic">
                    <img :src="movie.poster ? movie.poster :'static/img/no-poster.png'">
                </div>
                <div class="search-musname">
                    <span class="result-name ellipsis">{{ movie.name }}</span>
                    <span class="result-movie">电影</span>
                </div>
                <div class="search-linkbar"></div>
            </div>
        </div>
        <!-- 音乐 -->
        <div v-show="tabChange == 1">
            <div class="search-music"
                 v-for="(music,index) in searchData.music"
                 @click="musicPage(music)">
                <div class="search-pic">
                    <img :src="music.poster ? music.poster : 'static/img/no-poster.png'">
                </div>
                <div class="search-musname">
                    <span class="result-name ellipsis">{{ music.name }}</span>
                    <span class="result-movie">音乐</span>
                </div>
                <div class="search-linkbar"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {requestData, ERR_OK} from 'api/request';
    import {params} from 'api/params';

    const URL = 'http://api.mumiao.distspace.com/web/m2/search.do';

    export default{
        data(){
            return {
                tabChange: 0,
                searchData: {},
                searchContent: ""
            }
        },
        props: {
            content: {
                type: String,
                default: null
            }
        },
        mounted(){
            this._loadSearchData();
        },
        methods: {
            back(){
                this.$router.push({
                    name: 'search'
                });
                this.$emit('showNav');
            },
            search(){
                this._search(this.searchContent);
                this.searchContent = "";
            },
            moviePage(movieData){
                this.$router.push({
                    name: 'search-movie-page',
                    params: {
                        movie: movieData
                    }
                })
            },
            musicPage(musicData){
                this.$router.push({
                    name: 'search-music-page',
                    params: {
                        posters: this.searchData.movie,
                        music: musicData
                    }
                })
            },
            _loadSearchData(){
                if (this.$route.params.content) {
                    this._search(this.$route.params.content);
                }
            },
            _search(content){
                requestData(URL, {
                    page: params.page,
                    pageSize: params.pageSize,
                    searchText: content
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.searchData = res.data;
                    }
                })
            }
        },
        watch: {
            $route(){
                this._loadSearchData();
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .search-list {
        .search-input {
            flex: 8;
            height: 40px;
            margin-top: 22px;
            position: relative;
            & > input {
                width: 100%;
                line-height: 40px;
                font-size: 20px;
                padding-left: 30px;
                outline: none;
                border: none;
                box-sizing: border-box;
                border-radius: 5px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .search-music {
            margin: 20px 30px 0 30px;
            padding-bottom: 20px;
            display: flex;
            border-bottom: 1px solid #ededed;
            .search-pic {
                flex: 2;
            }
            .search-pic > img {
                width: 140px;
                height: 140px;
                vertical-align: top;
                border-radius: 5px;
            }
            .search-musname {
                flex: 7;
                padding-left: 30px;
                display: flex;
                flex-direction: column;
            }
            .result-name {
                margin: 20px 0;
                font-size: 30px;
                flex: 1;
            }
            .result-movie {
                font-size: 24px;
                color: #aaaaaa;
                flex: 1;
            }
            .ellipsis {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .search-linkbar {
                flex: 1;
                background: url("img/info-gt.png") no-repeat center;
                background-size: 16px 30px;
            }
        }
    }
</style>