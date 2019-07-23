/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    [C.GET_USERINFO](state, payload) {
        state.userInfo = payload;
    },
    [C.TOGGLE_LOGIN_MODAL](state, payload) {
        state.loginModal = {...payload};
    },
    [C.IS_LOGIN](state, payload) {
        state.isLogin = payload;
    }
};
