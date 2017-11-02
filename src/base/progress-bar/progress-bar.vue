<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd">
                <div class="progress-btn" ref="progressBtn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {prefixStyle} from 'common/js/dom';

    const progressBtnWidth = 16;
    const transform = prefixStyle('transform');

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created(){
            this.touch = {};
        },
        methods: {
            progressTouchStart(e){
                this.touch.initialed = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressTouchMove(e){
                if (!this.touch.initialed) {
                    return;
                }
                const distanceX = e.touches[0].pageX - this.touch.startX;
                const totalWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const offsetWidth = Math.min(totalWidth, Math.max(0, this.touch.left + distanceX));
                this._offset(offsetWidth);
            },
            progressTouchEnd(){
                this.touch.initialed = false;
                this._triggerPercent();
            },
            progressClick(e){
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._offset(offsetWidth);
                // 这里当我们点击progressBar的时候 e.offsetX 获取不对
                // this._offset(e.offsetX);
                this._triggerPercent();
            },
            _triggerPercent(){  // 拖动完进度条 把进度结果派发出去 因为这是一个基础组件 不在这里做业务逻辑
                const totalWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = this.$refs.progress.clientWidth / totalWidth;
                this.$emit('percentChange', percent);
            },
            _offset(offsetWidth){
                this.$refs.progress.style.width = `${offsetWidth}px`;
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
            }
        },
        watch: {
            percent(newPercent){
                if (newPercent >= 0 && !this.touch.initialed) {
                    const totalWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                    const offsetWidth = newPercent * totalWidth;
                    this._offset(offsetWidth);
                }
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .progress-bar {
        height: 30px;
        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            .progress {
                position: absolute;
                height: 100%;
                background: #000;
            }
            .progress-btn-wrapper {
                position: absolute;
                left: -8px;
                top: -13px;
                width: 30px;
                height: 30px;
                .progress-btn {
                    position: relative;
                    top: 7px;
                    left: 7px;
                    box-sizing: border-box;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #000;
                }
            }
        }
    }
</style>