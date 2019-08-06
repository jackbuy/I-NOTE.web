import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户注册
    userRegister: (params) => http('post', `${apiBaseUrl}/user/register`, params),
    // 已登录用户信息
    getUserInfo: (params) => http('post', `${apiBaseUrl}/user/userInfo`, params),

    // 已发布文章列表
    articleQuery: (params) => http('post', `${apiBaseUrl}/article/query`, params),
    // 已发布文章点赞
    articleSupport: (articleId) => http('get', `${apiBaseUrl}/article/support/${articleId}`),
    // 已发布文章收藏
    articleCollect: (articleId) => http('get', `${apiBaseUrl}/article/collect/${articleId}`),
    // 文章详情
    getDetail: (params) => http('post', `${apiBaseUrl}/article/detail`, params),
    // 文章新增
    articleAdd: (params) => http('post', `${apiBaseUrl}/article/add`, params),
    // 文章编辑
    articleEdit: (articleId, params) => http('put', `${apiBaseUrl}/article/edit/${articleId}`, params),
    // 文章删除
    articleDelete: (articleId) => http('delete', `${apiBaseUrl}/article/delete/${articleId}`),

    // Tag列表
    tagQuery: (params) => http('post', `${apiBaseUrl}/tag/query`, params),
    // 已关注Tag
    tagFollowQuery: (params) => http('post', `${apiBaseUrl}/tag/Follow/query`, params),

    // 消息列表
    messageQuery: () => http('get', `${apiBaseUrl}/message/query`),

    // 收藏列表
    collectQuery: (params) => http('post', `${apiBaseUrl}/collect/query`, params),

    // 关注列表
    followQuery: (params) => http('post', `${apiBaseUrl}/follow/query`, params),
    // 粉丝列表
    fansQuery: (params) => http('post', `${apiBaseUrl}/fans/query`, params),
    // 关注
    follow: (params) => http('post', `${apiBaseUrl}/follow`, params)

};
