<template>
    <div class="lines-wrap">
        <div v-for="lines in LinesList.lines">
            <!-- 台词内容 -->
            <div class="stutra-line">
                <div class="lines-title">- 经典台词 -</div>
                <div class="line-info">
                    <a class="line-text" v-html="lines.content"></a>
                </div>
                <!-- 操作 -->
                <div class="music-bar">
                    <span class="icon-copy-bar"
                          :data-clipboard-text="lines.content"
                          data-clipboard-action="copy"
                          @click="linesCopy">
                    </span>
                    <span class="icon-collect-bar"
                          @click="linesCollect(lines)"
                          :class="lines.myIsCollect ? 'clickCollect' : ''">
                     </span>
                    <span class="icon-thumbs-bar"
                          @click="linesLike(lines)"
                          :class="lines.myIsPraise ? 'clickThumbs' : ''">
                        <i class="thumbs-num">{{ lines.thumbs }}</i>
                    </span>
                </div>
            </div>
            <!-- 胶片背景 -->
            <div class="space"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {isLike} from 'src/api/isLike';
    import {isCollect} from 'src/api/isCollect';
    import {params} from 'src/api/params';

    export default{
        props: {
            LinesList: {
                type: Object,
                default: null
            }
        },
        methods: {
            linesCopy(){
                let clipboard = new Clipboard({
                    target: () => {
                        document.querySelector(copied);
                    }
                });
                clipboard.on('success', () => {
                    alert('复制成功');
                });
            },
            linesLike(lines){
                this._callFn(isLike, lines, params.linesLike);
            },
            linesCollect(lines){
                this._callFn(isCollect, lines, params.linesCollect);
            },
            // 回调函数
            _callFn(callName, target, type){
                if (localStorage.USERINFO) {
                    callName(target, type);
                }
                else {
                    this.$router.push({name: 'login'});
                }
            },
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .stutra-line {
        .lines-title {
            text-align: center;
            font-size: 24px;
            color: #aaaaaa;
            margin: 40px 0;
        }
        .line-info {
            margin: 0 30px 40px 30px;
            .line-text {
                font-size: 28px;
                line-height: 60px;
                color: #5D5D5D;
                text-indent: 2em;
                text-align: justify;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-line-clamp: 4;
            }
        }
    }
</style>