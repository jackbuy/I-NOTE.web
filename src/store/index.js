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
        token: localStorage.getItem('token'),
        systemInfo: {}, // 系统信息
        userInfo: {}, // 已登录用户信息
        loginModal: {
            open: false,
            type: ''
        },
        isHiddenHeader: false, // 是否隐藏头部
        documentTitle: '', // 文档标题
        socketLetter: {}, // socket私信
        socketUnreadLetterCount: {}, // socket未读私信数量
        socketUnreadMessageCount: {}, // socket未读消息数量
        socketNewPost: {}, // socket新动态
        socketOnlineUser: [], // socket在线用户,
        homeOffsetY: 0 // 首页滚动条的滚动位置
    },
    getters: {
        isLogin: state => !!state.token, // 是否已登录
        currentUserId: state => state.userInfo._id || '' // 当前登录用户Id
    },
    mutations: mutations,
    actions: actions
};

export default new Vuex.Store(Store);
