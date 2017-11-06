<template>
    <detail :music-detail="musicDetail" :posters-arr="postersArr"></detail>
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
                postersArr: [],
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
                    this.postersArr = this.$route.params.posters;
                    if (localStorage.USERINFO) {
                        // 处理返回用户信息
                        const userInfo = JSON.parse(localStorage.getItem('USERINFO'));
                        var accountId = userInfo.accountId;
                        var accessToken = userInfo.accessToken;
                    }
                    requestData(URL, {
                        musicId: this.$route.params.id,
                        accountId: accountId,
                        accessToken: accessToken
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            this.musicDetail = res.data;
                            console.log(accountId);
                            // console.log(this.musicDetail);
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
