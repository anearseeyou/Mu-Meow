<template>
    <div class="homepage-wrap" v-cloak>
        <!-- 首页头部 -->
        <div class="head-wrap">
            <div class="header">
                <a class="movie-code"></a>
                <span class="movie-title">{{ homeData.name }}</span>
            </div>
        </div>
        <!-- 电影海报 -->
        <div class="slider-banner" ref="slider" v-if="arrayData.length">
            <ul class="slider-group" ref="sliderGroup">
                <li @touchstart="beginTouch"
                    @touchmove.prevent="moveTouch($event,index)"
                    @touchend="endTouch(index)" v-for="(item,index) in arrayData">
                    <img :src="item.poster" class="poster">
                </li>
            </ul>
        </div>
        <!-- 上映时间 -->
        <div class="banner-info">
            <span class="deliveryTime">上映时间：{{ homeData.release }}</span>
            <span class="score">豆瓣评分：{{ homeData.score }}分</span>
        </div>
        <!-- 内容导航 -->
        <content-nav></content-nav>
        <!-- 占位符 -->
        <div class="content">
            <keep-alive>
                <router-view :homeData="homeData"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ContentNav from 'components/content-nav/content-nav';
    import {requestData} from 'src/api/request';
    import {ERR_OK} from 'api/request';
    import {params} from 'src/api/params';
    import {addClass} from 'common/js/dom';

    const URL = 'http://api.mumiao.distspace.com/web/m2/index.do';

    export default {
        data(){
            return {
                addPage: 3,
                homeData: {},
                arrayData: [],
            }
        },
        mounted(){
            this.touch = {};
            this._loadHomeData();

            setTimeout(() => {
                this._setSliderWidth();
            }, 200);

            // 监听视口发生改变
            window.addEventListener('resize', () => {
                this._setSliderWidth();
            });
        },
        methods: {
            // 开始滑动
            beginTouch(e){
                // 获取初始值
                this.touch.startX = e.touches[0].clientX;
            },
            // 移动
            moveTouch(e, index){
                let sliderWidth = this.$refs.slider.clientWidth;

                // 获取滑动距离
                this.touch.moveX = e.touches[0].clientX;
                // 时时监听滑动的距离
                this.touch.distanceX = this.touch.startX - this.touch.moveX;

                this._removeTransition();
                this._changeTranslateX(-index * sliderWidth - this.touch.distanceX);
            },
            // 结束滑动
            endTouch(index){
                this.touch.startY = 0;
                let sliderWidth = this.$refs.slider.clientWidth;

                if (Math.abs(this.touch.distanceX) >= 1 / 3 * sliderWidth && this.touch.moveX != 0) { // 长滑
                    this._changeTranslateX(0);
                }
                else if (Math.abs(this.touch.distanceX) > 10 && this.touch.moveX != 0) { // 快速滑动
                    if (this.touch.distanceX > 10) {
                        index++
                        requestData(URL, {
                            page: this.addPage++,
                            pageSize: params.pageSize,
                            accountId: params.accountId,
                            accessToken: params.accessToken
                        }).then((res) => {
                            if (res.code === ERR_OK) {
                                this.arrayData.push(res.data[0]);
                                this.homeData = this.arrayData[index];
                                this._setSliderWidth();
                            }
                        })
                    }
                    else {
                        index--
                        if (index <= 0) {
                            index = 0;
                        }
                        this.homeData = this.arrayData[index];
                    }
                }
                this._addTransition();
                this._changeTranslateX(-index * sliderWidth);

                this.touch.startX = 0;
                this.touch.moveX = 0;
                this.touch.distanceX = 0;
            },
            // 加载首页数据
            _loadHomeData(){
                for (let i = 1; i < 3; i++) {
                    requestData(URL, {
                        page: i,
                        pageSize: params.pageSize,
                        accountId: params.accountId,
                        accessToken: params.accessToken
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            this.arrayData.push(res.data[0]);
                            this.arrayData.sort((a, b) => {
                                return a.id - b.id;
                            });
                            this.homeData = this.arrayData[0];
                            // console.log(this.homeData);
                        }
                    })
                }
            },
            // 动态计算宽度
            _setSliderWidth(){
                // 获取轮播项
                this.children = this.$refs.sliderGroup.children;

                let containerWidth = 0;
                let sliderWidth = this.$refs.slider.clientWidth;

                for (let i = 0, len = this.children.length; i < len; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');

                    child.style.width = sliderWidth + 'px';
                    containerWidth += sliderWidth;
                }
                this.$refs.sliderGroup.style.width = containerWidth + 'px';
            },
            // 添加过度
            _addTransition() {
                const bannerSlider = this.$refs.slider;
                bannerSlider.style.transition = 'all 0.5s';
                bannerSlider.style.webkitTransition = 'all 0.5s';
            },
            // 移除过度
            _removeTransition() {
                const bannerSlider = this.$refs.slider;
                bannerSlider.style.transition = 'none';
                bannerSlider.style.webkitTransition = 'none';
            },
            // 改变位置
            _changeTranslateX(x) {
                const bannerSlider = this.$refs.slider;
                bannerSlider.style.transform = 'translateX(' + x + 'px)';
                bannerSlider.style.webkitTransform = 'translateX(' + x + 'px)';
            },
        },
        components: {
            ContentNav,
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .head-wrap {
        width: 100%;
        height: 88px;
        .header {
            width: 100%;
            height: 88px;
            line-height: 88px;
            text-align: center;
            background: #161619;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 150;
            .movie-code {
                width: 40px;
                height: 40px;
                position: absolute;
                left: 30px;
                top: 24px;
                background: url('img/code.png') no-repeat;
                background-size: 100% 100%;
            }
            .movie-title {
                font-size: 36px;
                flex: 1;
                color: #FFF;
            }
        }
    }

    .slider-banner {
        margin: 30px 0;
        min-height: 1px;
        .slider-group {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                overflow: hidden;
                text-align: center;
                box-sizing: border-box;
            }
            .poster {
                width: 690px;
                height: 100%;
                box-shadow: 1px 1px 10px #E5E5E9;
            }
        }
    }

    .banner-info {
        display: flex;
        margin-bottom: 40px;
        .deliveryTime, .score {
            font-size: 24px;
            flex: 0.5;
            color: #aaaaaa;
        }
        .deliveryTime {
            padding-left: 30px;
        }
        .score {
            text-align: right;
            padding-right: 30px;
        }
    }
</style>