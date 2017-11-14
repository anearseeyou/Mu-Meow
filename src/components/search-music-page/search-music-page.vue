<template>
    <div class="search-music-page">
        <music-detail :music-detail="musicPage" :posters-arr="postersArr"></music-detail>
    </div>
</template>

<script type="text/ecmascript-6">
    import musicDetail from 'base/detail/detail';
    import {requestData, ERR_OK, URL_PREFIX} from 'api/request';
    import {params} from 'api/params';

    const URL = URL_PREFIX + 'getMovieMusicDetail.do';

    export default{
        data(){
            return {
                musicPage: {},
                postersArr: {}
            }
        },
        mounted(){
            this._loadMusicData();
        },
        methods: {
            _loadMusicData(){
                if (this.$route.params.music) {
                    requestData(URL, {
                        accountId: params.accountId,
                        musicId: this.$route.params.music.id
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            this.musicPage = res.data;
                            this.postersArr = this.musicPage.poster;
                        }
                    })
                }
            }
        },
        components: {
            musicDetail
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>