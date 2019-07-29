/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    [C.GET_USER_INFO](state, payload) {
        state.userInfo = payload;
    },
    [C.MESSAGE_QUERY](state, payload) {
        state.msgData = payload;
    },
    [C.TOGGLE_LOGIN_MODAL](state, payload) {
        state.loginModal = {...payload};
    },
    [C.OPEN_LOGIN_MODAL](state, payload) {
        state.loginModal = {
            open: true,
            type: 'login'
        };
    }
};
