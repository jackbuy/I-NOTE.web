/**
 * store
 * @author: zhaozj
 */
import mutations from './mutations';
import actions from './actions';
import defaultState from './state';

const Store = {
    state: Object.assign(defaultState),
    getters: {},
    mutations: mutations,
    actions: actions
};

export default Store;
