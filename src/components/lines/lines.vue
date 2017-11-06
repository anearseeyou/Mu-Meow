<template>
    <lines-list :lines-list="homeData"></lines-list>
</template>

<script type="text/ecmascript-6">
    import LinesList from 'base/lines-list/lines-list';

    export default{
        props: {
            homeData: {
                type: Object,
                default: null,
            }
        },
        components: {
            LinesList
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>