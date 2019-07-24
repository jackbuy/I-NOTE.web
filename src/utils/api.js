import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户注册
    userRegister: (params) => http('post', `${apiBaseUrl}/user/register`, params),
    // 检查用户是否登录
    checkUserIsLogin: () => http('get', `${apiBaseUrl}/user/isLogin`),
    // 已登录用户信息
    getLoginUserInfo: () => http('get', `${apiBaseUrl}/user/loginUserInfo`),

    // 文章列表
    articleQuery: (params) => http('post', `${apiBaseUrl}/article/query`, params),
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

    // zone
    // 指定用户文章列表
    zoneArticleQuery: (params) => http('post', `${apiBaseUrl}/article/loginUser/query`, params)
};
