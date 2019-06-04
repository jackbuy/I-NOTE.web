/**
 * mutations
 * author: zhaozj
 */

import * as C from './mutation-types';
export default {
    [C.GET_USERINFO](state, payload) {
        state.userInfo = payload;
    }
};
