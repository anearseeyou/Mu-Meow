<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {addClass} from 'common/js/dom';
    import {requestData} from 'src/api/request';
    import {params} from 'src/api/params';

    export default{
        data(){
            return {
                page: 3
            }
        },
        mounted(){
            // 加载时 初始化组件
            setTimeout(() => {
                this._setSliderWidth();
                this._initSlider();
            }, 20);

            // 监听视口发生改变
            window.addEventListener('resize', () => {
                if (!this.slider) return;
                this._setSliderWidth();
                this.slider.refresh();
            });
        },
        props: {
            arrayData: {
                type: Array,
                default: null
            },
            homeData: {
                type: Object,
                default: null
            }
        },
        methods: {
            _setSliderWidth(){
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
            },
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    click: false,
                    snap: {
                        speed: 400,
                        threshold: 0.3,
                    },
                });

                // 监听滚动结束 设置索引
                this.slider.on('scrollEnd', () => {
                    // bette-scroll中获取当前元素索引的方法
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    let url = 'http://api.mumiao.distspace.com/web/m2/index.do';
                    requestData(url, {
                        page: this.page++,
                        pageSize: params.pageSize,
                        accountId: params.accountId,
                        accessToken: params.accessToken
                    }).then((res) => {
                        if (res.code === 0) {
                            this.arrayData.push(res.data[0]);
                            this.homeData = this.arrayData[pageIndex];
                            this._setSliderWidth();
                            this.$emit('change', this.homeData);
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .slider {
        min-height: 1px;
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