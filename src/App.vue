<template>
    <div id="app">
        <!-- 全局导航 -->
        <home-nav></home-nav>
        <!-- 占位符 -->
        <div class="footer-nav">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import homeNav from './components/home-nav/home-nav.vue';
    export default {
        components: {
            'home-nav': homeNav,
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>