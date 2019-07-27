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
        }
    },
    getters: {},
    mutations: mutations,
    actions: actions
};

export default new Vuex.Store(Store);
