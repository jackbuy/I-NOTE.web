/**
 * actions
 * author: zhaozj
 */

import * as C from './mutation-types';
import api from '@/utils/api';
export default {
    // 获取用户信息
    [C.GET_USER_INFO]({commit}, params) {
        api.getUserInfo().then((res) => {
            commit(C.GET_USER_INFO, res.data);
        });
    },
    // 获取文章
    [C.ARTICLE_QUERY]({commit}, params) {
        return api.articleQuery(params);
    },
    // 获取Tag
    [C.TAG_QUERY]({commit}, params) {
        return api.tagQuery();
    },
    // 文章点赞
    [C.ARTICLE_SUPPORT]({commit}, params) {
        return api.articleSupport(params);
    }
};
