/**
 * store
 * @author: zhaozj
 */
import mutations from './mutations';
import actions from './actions';

const Store = {
    state: {
        loginUserInfo: {}, // 已登录用户信息
        isLogin: false,
        loginModal: {
            open: false,
            type: ''
        }
    },
    getters: {},
    mutations: mutations,
    actions: actions
};

export default Store;
