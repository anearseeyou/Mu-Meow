<template>
    <div class="share-layer">
        <div class="share-to">分享到</div>
        <div class="share-link">
            <a class="share-link-to" href="javascript:;">
                <span class="share-qq"></span><br>
                <em>QQ</em>
            </a>
            <a class="share-link-to" href="javascript:;">
                <span class="share-fr"></span><br>
                <em>朋友圈</em>
            </a>
            <a class="share-link-to" href="javascript:;">
                <span class="share-wb"></span><br>
                <em>微博</em>
            </a>
            <a class="share-link-to" href="javascript:;">
                <span class="share-wx"></span><br>
                <em>微信</em>
            </a>
        </div>
        <div class="share-close" @click="shareClose">
            <i class="share-close-bar"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        methods: {
            shareClose(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .share-layer {
        width: 100%;
        background: #FFF;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 24;
        text-align: center;
        .share-to {
            width: 100%;
            height: 80px;
            line-height: 80px;
            margin-bottom: 40px;
            font-size: 30px;
        }
        .share-link {
            margin: 0 30px;
            display: flex;
        }
        .share-link-to {
            flex: 1;
            font-size: 24px;
            & > span {
                height: 49px;
                margin: 0 auto;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            & > em {
                width: 100%;
                color: #333;
                font-size: 22px;
                font-style: normal;
                text-align: center;
            }
            .share-qq {
                width: 40px;
                background-image: url("img/share-qq.png");
            }
            .share-fr {
                width: 49px;
                background-image: url("img/share-friend.png");
            }
            .share-wb {
                width: 59px;
                background-image: url("img/share-wb.png");
            }
            .share-wx {
                width: 64px;
                background-size: 100% 100%;
                background-image: url("img/share-wx.png");
            }
        }
        .share-close {
            height: 80px;
            margin-top: 30px;
            border-top: 1px solid #ededed;
            .share-close-bar {
                width: 26px;
                height: 26px;
                margin: 25px auto;
                background: url("img/share-close.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>