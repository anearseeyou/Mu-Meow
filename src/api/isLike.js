import axios from 'axios'
import qs from 'qs'
import {params} from 'src/api/params'

export const ERR_OK = 0;

export function isLike(target, type) {
    const url = 'http://api.mumiao.distspace.com/web/m2/consumerPraise.do';
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
        return axios.post(url, data, headers)
            .then((res) => {
                if (res.data.code === ERR_OK) {
                    target.myIsPraise = true;
                    target.thumbs++;
                }
            })
    }
}