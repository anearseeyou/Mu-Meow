<template>
    <div id="app">
        <!-- 全局导航 -->
        <home-nav v-show="flag"></home-nav>
        <!-- 占位符 -->
        <div class="footer-nav">
            <keep-alive>
                <router-view @hideNav="hideNav" @showNav="showNav"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import homeNav from './components/home-nav/home-nav';

    export default {
        data(){
            return {
                flag: true
            }
        },
        methods: {
            hideNav(){
                this.flag = false;
            },
            showNav(){
                this.flag = true;
            }
        },
        components: {
            homeNav,
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .footer-nav {
        margin-bottom: 98px;
    }

</style>