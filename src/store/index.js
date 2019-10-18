/**
 * store
 * @author: zhaozj
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const Store = {
    state: {
        userInfo: {}, // 已登录用户信息
        loginModal: {
            open: false,
            type: ''
        },
        isHiddenBreadcrumb: false, // 是否隐藏面包屑
        documentTitle: '',
        socketMsg: {}, // socket消息体
        socketOnlineUser: [] // socket在线用户
    },
    getters: {},
    mutations: mutations,
    actions: actions
};

export default new Vuex.Store(Store);
