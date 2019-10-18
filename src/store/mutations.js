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
    [C.HIDDEN_BREADCRUMB](state, payload) {
        state.isHiddenBreadcrumb = payload;
    },
    [C.SET_DOCUMENT_TITLE](state, payload) {
        state.documentTitle = payload;
    }
};
