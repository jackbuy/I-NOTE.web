/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
// import api from '@/api';
export default {
    [C.GET_USERINFO]({commit}, payload) {
        commit(C.GET_USERINFO, payload);
    }
};
