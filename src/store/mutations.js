/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    [C.SOCKET_ONLINE_USER](state, payload) {
        state.socketOnlineUser = payload;
    },
    [C.SOCKET_NEW_MSG](state, payload) {
        state.socketMsg = payload;
    },
    [C.SOCKET_MESSAGE_COUNT](state, payload) {
        state.socketMsgCount = payload.count;
    },
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
