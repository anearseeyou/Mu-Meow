<template>
    <div class="search-wrap">
        <div class="search-info">
            <h1 class="mm-search">幕喵搜索</h1>
            <p class="mm-text grayColor">搜索引擎就是把字典放到硅片里</p>
            <div class="search-box">
                <input class="search-input" type="text" placeholder="这里输入搜索词" v-model="searchContent">
                <i @click="search(searchContent)" class="search-btn"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                searchContent: ""
            }
        },
        methods: {
            search(searchContent){
                if (searchContent == "") {
                    alert("请输入内容");
                }
                else {
                    this.searchContent = ""
                    this.$router.push({
                        name: 'search-list',
                        params: {
                            content: searchContent
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .search-wrap {
        padding-top: 400px;
        margin: 0 30px;
        text-align: center;
        .search-info {
            margin: 0 auto;
            .mm-search {
                font-size: 34px;
                margin-bottom: 50px;
            }
            .mm-text {
                font-size: 24px;
                margin-bottom: 100px;
            }
            .search-box {
                width: 500px;
                height: 80px;
                line-height: 80px;
                margin: 0 auto;
                position: relative;
                box-sizing: border-box;
                border-bottom: 1px solid #aaaaaa;
                .search-btn {
                    display: block;
                    width: 50px;
                    height: 50px;
                    background: url("img/input-search.png") no-repeat center;
                    background-size: 30px 30px;
                    position: absolute;
                    right: 0;
                    bottom: 15px;
                }
                .search-input {
                    height: 80px;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    text-align: center;
                    font-size: 24px;
                    outline: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                }
            }
        }
    }
</style>