/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
import api from '@/utils/api';
export default {
    [C.GET_USERINFO]({commit}, payload) {
        commit(C.GET_USERINFO, payload);
    },
    [C.CHECK_USER_IS_LOGIN]({commit}, payload) {
        api.checkUserIsLogin().then((res) => {
            if (res.code === 200) {
                commit(C.IS_LOGIN, res.data);
            }
        });
    }
};
