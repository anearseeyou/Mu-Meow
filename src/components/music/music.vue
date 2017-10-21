<template>
    <music-list :homeData="homeData"></music-list>
</template>

<script type="text/ecmascript-6">
    import musicList from 'base/music-list/music-list';

    export default{
        props: {
            homeData: {
                type: Object,
                default: null,
            }
        },

        components: {
            musicList
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>