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

    export default{
        mounted(){
            setTimeout(() => {
                this._setSliderWidth();
                this._initSlider();
            }, 20);
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
                    snap: {
                        speed: 400,
                        threshold: 0.3,
                    },
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