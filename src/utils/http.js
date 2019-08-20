import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';
const store = require('@/store');

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
            if (response.data.msg && response.data.code === 500) {
                Message.warning({ message: response.data.msg });
            }
            if (response.data.code === 401) {
                if (localStorage.getItem('token') && localStorage.getItem('userId')) {
                    localStorage.clear();
                    window.location.reload();
                    // Message.warning({ message: 'token已过期' });
                } else {
                    store.default.commit('OPEN_LOGIN_MODAL');
                }
                localStorage.clear();
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
        }).catch(() => {
            // reject(err);
        });
    });
};

export default http;
