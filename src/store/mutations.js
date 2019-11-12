/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    // socket
    [C.SOCKET_ONLINE_USER](state, payload) {
        state.socketOnlineUser = payload;
    },
    [C.SOCKET_NEW_MSG](state, payload) {
        state.socketMsg = payload;
    },
    [C.SOCKET_NEW_POST](state, payload) {
        state.socketPost = payload;
    },
    [C.SOCKET_NEW_POST_RESET](state, payload) {
        state.socketPost = {};
    },
    // userInfo
    [C.GET_USER_INFO](state, payload) {
        state.userInfo = payload;
    },
    [C.TOGGLE_LOGIN_MODAL](state, payload) {
        state.loginModal = {...payload};
    },
    [C.OPEN_LOGIN_MODAL](state, payload) {
        state.loginModal = {
            open: true,
            type: 'login'
        };
    },
    [C.IS_HIDDEN_HEADER](state, payload) {
        state.isHiddenHeader = payload;
    },
    [C.SET_DOCUMENT_TITLE](state, payload) {
        state.documentTitle = payload;
    }
};
