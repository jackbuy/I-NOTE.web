import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';

axios.defaults.headers.common['token'] = localStorage.getItem('token') || '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function(config) {
    if (config.method === 'post' || config.method === 'put') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
    if (response.status === 200) {
        if (response.data.code === 200) {
            return Promise.resolve(response.data);
        } else {
            if (response.data.msg) {
                Message.warning({ message: response.data.msg });
            }
            return Promise.reject(response.data);
        }
    } else {
        console.log(response);
    }
}, function(error) {
    Message.warning({message: '数据请求失败'});
    return Promise.reject(error);
});

const http = (method, url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: data
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export default http;
