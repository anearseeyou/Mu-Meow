<template>
    <div class="comment-wrap">
        <!-- 评论列表页 -->
        <div class="title">- 影片短评 -</div>
        <div v-for="comment in commentData" class="ratings-list conmment-list">
            <div class="conmment-content clearfix">
                <div class="user-portrait fl">
                    <img :src="comment.avatar">
                </div>
                <div class="user-info fr user-operation">
                    <div class="user-name clearfix">
                        <span class="fl">{{ comment.username }}</span>
                        <span class="fabu-num fr">{{ comment.thumbs }}</span>
                        <span class="icon-thumbs-bar fr"
                              :class="comment.myIsPraise ? 'clickThumbs' : ''"
                              @click="commentLike(comment)">
                            </span>
                    </div>
                    <p class="rat-date">{{ comment.rateTime }}</p>
                    <p class="change-sty">{{ comment.content }}</p>
                </div>
            </div>
            <!-- 间隙 -->
            <div class="space"></div>
        </div>
        <none-data v-if="commentData" v-show="!commentData.length"></none-data>
        <!-- 加载更多 -->
        <more-data v-show="commentData != 0" @loadMore="loadMore" :more-data="moreData"></more-data>
    </div>
</template>

<script type="text/ecmascript-6">
    import NoneData from 'base/none-data/none-data';
    import MoreData from 'base/more-data/more-data';
    import {isLike} from 'src/api/isLike';
    import {requestData, ERR_OK} from 'api/request';
    import {params} from 'api/params';

    const URL = 'http://api.mumiao.distspace.com/web/m2/getMovieComment.do';

    export default{
        data(){
            return {
                morePage: 2,
                moreData: {},
                commentData: {}
            }
        },
        props: {
            homeData: {
                type: Object,
                default: null
            }
        },
        created(){
            this._loadCommentData();
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
                            this.commentData.push(this.moreData[i]);
                        }
                    }
                })
            },
            // 点赞
            commentLike(comment){
                this._callFn(isLike, comment, params.commentaryLike)
            },
            // 加载评论数据
            _loadCommentData(){
                requestData(URL, {
                    movieId: this.homeData.id,
                    accountId: params.accountId,
                    page: params.page,
                    pageSize: params.morePageSize
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.commentData = res.data;
                    }
                })
            },
            // 回调函数
            _callFn(callName, target, type){
                if (localStorage.USERINFO) {
                    callName(target, type);
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
        },
        components: {
            NoneData,
            MoreData,
        },
        watch: {
            $route(){
                // this._loadCommentData();
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .comment-wrap {
        font-size: 28px;
        .conmment-content {
            margin: 0 30px 40px 30px;
        }
        .user-operation:after {
            height: 0;
        }
        .conmment-list {
            margin-top: 40px;
            margin-bottom: 0;
        }
    }
</style>