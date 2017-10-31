<template>
    <detail :musicDetail="musicDetail"></detail>
</template>

<script type="text/ecmascript-6">
    import Detail from 'base/detail/detail';
    import {requestData, ERR_OK} from 'src/api/request'
    import {params} from 'src/api/params'

    const URL = 'http://api.mumiao.distspace.com/web/m2/getMovieMusicDetail.do';

    export default{
        data(){
            return {
                musicDetail: {},
            }
        },
        mounted(){
            this.musicDetailData();
        },
        methods: {
            // 获取数据
            musicDetailData(){
                document.body.scrollTop = 0;
                if (this.$route.params.id) {
                    requestData(URL, {
                        musicId: this.$route.params.id,
                        accountId: params.accountId,
                        accessToken: params.accessToken
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            this.musicDetail = res.data;
                        }
                    });
                }
            },
        },
        components: {
            Detail
        },
        watch: {
            $route(){
                this.musicDetailData();
            }
        }
    }
</script>
