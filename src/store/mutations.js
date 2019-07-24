/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    [C.GET_LOGIN_USERINFO](state, payload) {
        state.loginUserInfo = payload;
    },
    [C.TOGGLE_LOGIN_MODAL](state, payload) {
        state.loginModal = {...payload};
    },
    [C.IS_LOGIN](state, payload) {
        state.isLogin = payload;
    }
};
