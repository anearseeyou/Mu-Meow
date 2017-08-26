import axios from 'axios'
import qs from 'qs'

export const ERR_OK = 0;

export function requestData(url, params) {
    const data = Object.assign({}, params);
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
    return axios.post(url, data, headers)
        .then((res) => {
            if (res.data.code === ERR_OK) {
                return Promise.resolve(res.data);
            }
            else {
                alert("request failed");
            }
        })
        .catch((err) => console.log(err))
}