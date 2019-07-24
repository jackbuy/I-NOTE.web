/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
import api from '@/utils/api';
export default {
    [C.GET_LOGIN_USERINFO]({commit}, payload) {
        api.getLoginUserInfo().then((res) => {
            commit(C.GET_LOGIN_USERINFO, res.data);
        });
    },
    [C.CHECK_USER_IS_LOGIN]({commit}, payload) {
        api.checkUserIsLogin().then((res) => {
            if (res.code === 200) {
                commit(C.IS_LOGIN, res.data);
            }
        });
    }
};
