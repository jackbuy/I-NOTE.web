/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    // homeOffsetY
    [C.SET_HOME_OFFSET_Y](state, payload) {
        state.homeOffsetY = payload;
    },
    // socket
    [C.SOCKET_ONLINE_USER](state, payload) {
        state.socketOnlineUser = payload;
    },
    [C.SOCKET_UNREAD_MESSAGE_COUNT](state, payload) {
        state.socketUnreadMessageCount = payload;
    },
    [C.SOCKET_NEW_POST](state, payload) {
        state.socketNewPost = payload;
    },
    [C.SOCKET_NEW_POST_RESET](state, payload) {
        state.socketNewPost = {};
    },
    [C.SOCKET_NEW_LETTER](state, payload) {
        state.socketLetter = payload;
    },
    [C.SOCKET_UNREAD_LETTER_COUNT](state, payload) {
        state.socketUnreadLetterCount = payload;
    },
    // systemInfo
    [C.GET_SYSTEM_INFO](state, payload) {
        state.systemInfo = payload;
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
