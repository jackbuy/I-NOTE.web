/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
import api from '@/utils/api';
export default {
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
    },
    // 获取新消息
    [C.GET_NEW_MSG]({commit}, params) {
        api.newMessage(params).then((res) => {
            console.log(res);
        });
    }
};
