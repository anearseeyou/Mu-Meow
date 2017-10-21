<template>
    <div v-show="false" class="sign-wrapper">
        <!-- 登录 -->
        <div class="head-wrap">
            <div class="sign-head">
                <div class="back-btn"></div>
                <div class="play-title">幕喵</div>
            </div>
        </div>
        <!-- 输入框 -->
        <div class="sign-in">
            <div class="movie-log"></div>
            <div class="user-name clearfix">
                <div class="user-bar fl"></div>
                <input class="user-input fl" type="text"
                       placeholder="请输入手机号"
                       @input="inputText"
                       v-model="phomeNum">
            </div>
            <div class="user-name password">
                <div class="user-bar pwd-bar fl"></div>
                <input v-model="inputCode" class="user-input fl" type="password" placeholder="请输入验证码">
                <div v-show="flag" class="obtain-code" @click="getCode">获取验证码</div>
                <div v-show="!flag" class="obtain-code send-code">{{ countext }}</div>
            </div>
            <div class="user-name signing-in">
                <input @click="quickLogin" class="user-input sign-btn fl" type="button" value="快速登录">
            </div>
        </div>
        <!-- 其他 -->
        <div class="other-login">其他登录方式</div>
        <!-- 第三方登录 -->
        <div class="relation">
            <a class="relation-sign">
                <span class="relation-wx"></span>
            </a>
            <a class="relation-sign ">
                <span class="relation-qq"></span>
            </a>
            <a class="relation-sign ">
                <span class="relation-wb"></span>
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {requestData} from 'api/request';
    import {ERR_OK} from 'api/request';

    export default {
        data(){
            return {
                flag: true,
                countext: null,
                phomeNum: null,
                inputCode: null,
            }
        },
        methods: {
            // 控制手机号位数
            inputText(){
                let phone = this.phomeNum;
                if (phone >= 11) {
                    phone = 11;
                    this.phomeNum = this.phomeNum.substr(0, 11);
                }
            },
            // 获取验证码
            getCode(){
                console.log(this.phomeNum);
                let url = 'http://api.mumiao.distspace.com/web/m2/getValidateCode.do';
                requestData(url, {
                    mobile: this.phomeNum
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        this.flag = false;
                        this._countDown();
                    }
                })
            },
            // 立即登录
            quickLogin(){
                let url = 'http://api.mumiao.distspace.com/web/m2/quickLogin.do';
                requestData(url, {
                    mobile: this.phomeNum,
                    code: this.inputCode
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        let loginInfo = res.data;
                        localStorage.setItem('USERINFO', loginInfo);
                    }
                })
            },
            // 倒计时
            _countDown(){
                let second = 120;
                for (let i = 0; i <= second; i++) {
                    setTimeout(() => {
                        if (second !== 0) {
                            this.countext = second + '秒后重发';
                            second--;
                        }
                        else {
                            second = 120;
                            this.flag = true;
                        }
                    }, i * 1000);
                }
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .sign-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 150;
        width: 100%;
        height: 100%;
        background: #FFFFFF;
        .head-wrap {
            width: 100%;
            height: 88px;
            .sign-head {
                width: 100%;
                height: 88px;
                line-height: 88px;
                text-align: center;
                background: #151519;
                box-sizing: border-box;
                position: fixed;
                top: 0;
                z-index: 22;
                color: #ffffff;
                font-size: 36px;
                .back-btn {
                    width: 18px;
                    height: 30px;
                    font-size: 50px;
                    position: absolute;
                    left: 30px;
                    top: 24px;
                    background: url('img/back.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .sign-in {
            margin: 100px auto;
            padding: 0 30px;
            .movie-log {
                width: 80px;
                height: 80px;
                margin: 0 auto;
                margin-bottom: 100px;
                background: url("img/movie-logo.png") no-repeat;
                background-size: 100% 100%;
            }
            .user-name {
                width: 100%;
                height: 70px;
                font-size: 24px;
                margin-bottom: 100px;
                color: #aaaaaa;
                border: 1px solid #161619;
                border-radius: 10px;
                box-sizing: border-box;
                position: relative;
                .user-bar {
                    position: absolute;
                    left: 20px;
                    top: 19px;
                    width: 26px;
                    height: 32px;
                    background: url("img/phone-bar.png") no-repeat;
                    background-size: 100% 100%;
                }
                .user-input {
                    margin-left: 54px;
                    padding-left: 10px;
                    width: 70%;
                    height: 100%;
                    outline: none;
                    background: transparent;
                    box-sizing: border-box;
                    border-top-right-radius: 1px;
                    border-bottom-right-radius: 1px;
                }
                .pwd-bar {
                    width: 32px;
                    height: 24px;
                    top: 23px;
                    background: url("img/password-bar.png") no-repeat;
                    background-size: 100% 100%;
                }
                .sign-btn {
                    width: 100%;
                    height: 100%;
                    padding-left: 0;
                    border-radius: 1rem;
                    color: #ffffff;
                    background: #161619;
                    margin-left: 0;
                }
                .obtain-code {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #aaaaaa;
                    background: rgba(233, 233, 233, 0.5);
                    color: #333;
                    padding: 5px;
                    margin-top: 9px;
                    border-radius: 5px;
                }
                .send-code {
                    background: #bdbdbd;
                }
            }
            .signing-in {
                padding-left: 0;
                border: none;
                margin-bottom: 100px;
            }
        }
        .other-login {
            width: 100%;
            height: 140px;
            line-height: 140px;
            font-size: 30px;
            color: #aaaaaa;
            text-align: center;
            margin-bottom: 30px;
        }
        .relation {
            margin: 0 auto;
            display: flex;
            .relation-sign {
                flex: 1;
                & > span {
                    display: block;
                    width: 104px;
                    height: 100px;
                    margin: 0 auto;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
            .relation-wx {
                background: url("img/relation-wx.png") no-repeat;
            }
            .relation-qq {
                background: url("img/relation-qq.png") no-repeat;
            }
            .relation-wb {
                background: url("img/relation-wb.png") no-repeat;
            }
        }
    }

</style>