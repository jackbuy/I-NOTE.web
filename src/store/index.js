/**
 * store
 * @author: zhaozj
 */
import mutations from './mutations';
import actions from './actions';

const Store = {
    state: {
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
