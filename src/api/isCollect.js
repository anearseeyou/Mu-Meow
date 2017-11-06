import axios from 'axios'
import qs from 'qs'
import {params} from 'src/api/params'

export const ERR_OK = 0;
const LOGIN_CODE = 4001;

export function isCollect(target, type) {
    if (localStorage.USERINFO) {
        const url = 'http://api.mumiao.distspace.com/web/m2/consumerCollect.do';

        // 处理返回用户信息
        const userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        const accountId = userInfo.accountId;
        const accessToken = userInfo.accessToken;

        // 成功收藏
        const successData = Object.assign({}, {
            collectTargetId: target.id,
            collectType: type,
            paramType: params.successCollect,
            accountId: accountId,
            accessToken: accessToken
        });
        // 取消收藏
        const cancelData = Object.assign({}, {
            collectTargetId: target.id,
            collectType: type,
            paramType: params.cancelCollect,
            accountId: accountId,
            accessToken: accessToken
        });

        // POST请求头 以及类型转换
        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [
                function (data) {
                    return qs.stringify(data);
                }
            ]
        };

        // 根据返回的参数 发送不同的请求
        if (target.myIsCollect == false) {
            return axios.post(url, successData, headers).then((res) => {
                if (res.data.code === ERR_OK) {
                    target.myIsCollect = true;
                }
                else if (res.data.code === LOGIN_CODE) {
                    console.log(res.data.message);
                }
            })
        }
        else if (target.myIsCollect) {
            return axios.post(url, cancelData, headers).then((res) => {
                if (res.data.code === ERR_OK) {
                    target.myIsCollect = false;
                }
                else if (res.data.code === LOGIN_CODE) {
                    console.log(res.data.message);
                }
            })
        }
    }
}

