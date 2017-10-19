import axios from 'axios'
import qs from 'qs'
import {params} from 'src/api/params'

export const ERR_OK = 0;

export function isCollect(target, type) {
    const url = 'http://192.168.0.244:8081/web/m2/consumerCollect.do';
    // 成功收藏
    const successData = Object.assign({}, {
        collectTargetId: target.id,
        collectType: type,
        paramType: params.successCollect,
        accountId: params.accountId,
        accessToken: params.accessToken
    });
    // 取消收藏
    const cancelData = Object.assign({}, {
        collectTargetId: target.id,
        collectType: type,
        paramType: params.cancelCollect,
        accountId: params.accountId,
        accessToken: params.accessToken
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
        })
    }
    else if (target.myIsCollect) {
        return axios.post(url, cancelData, headers).then((res) => {
            if (res.data.code === ERR_OK) {
                target.myIsCollect = false;
            }
        })
    }
}

