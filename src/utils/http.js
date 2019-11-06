import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';
const store = require('@/store');

let token = localStorage.getItem('token') || '';

axios.defaults.headers.common['token'] = token;
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
            if (response.data.msg && response.data.code === 500) {
                Message.warning({ message: response.data.msg });
            }
            if (response.data.code === 401) {
                localStorage.clear();
                if (token) {
                    window.location.reload();
                } else {
                    store.default.commit('OPEN_LOGIN_MODAL');
                }
            }
            return Promise.reject(response.data);
        }
    } else {
        Message.warning({message: '数据请求异常！'});
    }
}, function(error) {
    Message.warning({message: '链接服务器异常！'});
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
