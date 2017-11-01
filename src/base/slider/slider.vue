<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {addClass} from 'common/js/dom';

    export default{
        data(){
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 2000
            }
        },
        mounted(){
            // 加载时 初始化组件
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
            }, 20);

            // 自动轮播
            if (this.autoPlay) {
                this._play();
            }

            // 监听视口发生改变
            window.addEventListener('resize', () => {
                if (!this.slider) return;
                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },

        methods: {
            // 设置宽度
            _setSliderWidth(isResize){
                // 获取轮播项
                this.children = this.$refs.sliderGroup.children;

                let containerWidth = 0;
                // 获取容器宽度
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0, len = this.children.length; i < len; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');

                    child.style.width = sliderWidth + 'px';
                    containerWidth += sliderWidth;
                }
                this.$refs.sliderGroup.style.width = containerWidth + 'px';

                if (this.loop && !isResize) {
                    containerWidth += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = containerWidth + 'px';
            },
            // 初始化小圆点
            _initDots(){
                // 在拷贝图片之前 初始化小圆点 和图片的数量保持一致
                this.dots = new Array(this.children.length);
            },
            // 初始化
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    click: false,
                    snap: {
                        speed: 400,
                        threshold: 0.3,
                        loop: this.loop,
                    },
                });

                // 监听滚动结束
                this.slider.on('scrollEnd', () => {
                    // bette-scroll中获取当前元素索引的方法
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    // 如果是循环播放的话 当前索引得-1
                    if (this.loop) pageIndex -= 1;
                    this.currentPageIndex = pageIndex;

                    if (this.autoPlay) {
                        clearTimeout(this.timer);
                        this._play();
                    }
                });
            },

            // 自动轮播
            _play(){
                let pageIndex = this.currentPageIndex + 1;
                if (this.loop) pageIndex += 1;
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval);
            }
        },
        destroyed(){
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .slider {
        min-height: 1px;
        position: relative;
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
            }
        }
    }
</style>