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
            commit(C.GET_USER_INFO, res.data);
        });
    },
    // 获取所有消息
    [C.MESSAGE_QUERY]({commit}, params) {
        api.messageQuery().then((res) => {
            commit(C.MESSAGE_QUERY, res.data);
        });
    }
};
