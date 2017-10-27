<template>
    <div ref="scrollWrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';

    export default{
        data(){
            return {}
        },
        props: {
            // 快速拖动或者缓慢拖动
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false  // 插件不需要监听滚动 所以默认是false
            }
        },
        mounted(){
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll(){
                // 判断dom是否渲染
                if (!this.$refs.scrollWrapper) {
                    return
                }
                // better-scroll实例化 配置
                this.scroll = new BScroll(this.$refs.scrollWrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
                // 监听滚动
                if (this.listenScroll) {
                    let _this = this;
                    this.scroll.on('scroll', (pos) => {
                        _this.$emit('scroll', pos);
                    });
                }
            },
            // 代理方法
            enable(){
                this.scroll && this.scroll.enable();
            },
            disable(){
                this.scroll && this.scroll.disable();
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            },
            scrollTo(){
                // apply 修改内部指针 保证是同一个目标
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement(){
                // apply 修改内部指针 保证是同一个目标
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data(){
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }
    }
</script>
