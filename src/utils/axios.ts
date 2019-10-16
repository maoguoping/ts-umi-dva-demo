import axios from 'axios';
interface HttpUtil {
    post: any,
    get: any
}
const http: HttpUtil = {
    post(url: string, data: any = {} , config: any = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    get(url: string, data: any = {} , config: any = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data,
                ...config
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    },
};

export default http;