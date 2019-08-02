import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户注册
    userRegister: (params) => http('post', `${apiBaseUrl}/user/register`, params),
    // 已登录用户信息
    getUserInfo: () => http('get', `${apiBaseUrl}/user/userInfo`),

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
    tagQuery: () => http('get', `${apiBaseUrl}/tag/query`),

    // 消息列表
    messageQuery: () => http('get', `${apiBaseUrl}/message/query`),

    // 收藏列表
    collectQuery: () => http('get', `${apiBaseUrl}/collect/query`),

    // 关注人列表
    followUserQuery: () => http('get', `${apiBaseUrl}/follow/user/query`),
    // 粉丝列表
    fansQuery: () => http('get', `${apiBaseUrl}/fans/query`),
    // 关注人
    followUser: (followUserId) => http('get', `${apiBaseUrl}/follow/user/${followUserId}`),

    // zone
    // 指定用户文章列表
    zoneArticleQuery: (params) => http('post', `${apiBaseUrl}/article/mine/query`, params)
};