/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
import api from '@/utils/api';
export default {
    // 获取系统信息
    [C.GET_SYSTEM_INFO]({commit}, params) {
        return new Promise((resolve, reject) => {
            api.systemDetail().then((res) => {
                if (res.data) {
                    commit(C.GET_SYSTEM_INFO, res.data);
                    resolve();
                } else {
                    reject(new Error());
                }
            }).catch((e) => {
                reject(e);
            });
        });
    },
    // 获取用户信息
    [C.GET_USER_INFO]({commit}, params) {
        api.getUserInfo().then((res) => {
            if (res.data) {
                commit(C.GET_USER_INFO, res.data);
            } else {
                window.localStorage.clear();
                window.location.reload();
            }
        });
    }
};
