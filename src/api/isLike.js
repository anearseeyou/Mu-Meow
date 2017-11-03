import axios from 'axios'
import qs from 'qs'
import {params} from 'src/api/params'

export const ERR_OK = 0;
const LOGIN_CODE = 4001;

export function isLike(target, type) {
    const url = 'http://api.mumiao.distspace.com/web/m2/consumerPraise.do';

    // 处理返回用户信息
    // const userInfo = JSON.parse(localStorage.getItem('USERINFO'));
    // const accountId = userInfo.accountId;
    // const accessToken = userInfo.accessToken;

    // 请求参数
    const data = Object.assign({}, {
        targetId: target.id,
        praiseType: type,
        accountId: params.accountId,
        accessToken: params.accessToken
    });
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
    if (target.myIsPraise == false) {
        return axios.post(url, data, headers).then((res) => {
            if (res.data.code === ERR_OK) {
                target.myIsPraise = true;
                target.thumbs++;
            }
            else if (res.data.code === LOGIN_CODE) {
                console.log(res.data.message);
            }
        })
    }
}
