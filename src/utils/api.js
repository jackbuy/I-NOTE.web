import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户注册
    userRegister: (params) => http('post', `${apiBaseUrl}/user/register`, params),
    // 已登录用户信息
    getUserInfo: (params) => http('post', `${apiBaseUrl}/user/userInfo`, params),
    // 空间用户信息
    getZoneUserInfo: (params) => http('post', `${apiBaseUrl}/user/zoneUserInfo`, params),
    // 编辑用户信息
    userInfoEdit: (params) => http('post', `${apiBaseUrl}/user/userInfoEdit`, params),
    // 用户推荐
    userRecommend: () => http('get', `${apiBaseUrl}/user/recommend`),

    // 已发布文章列表
    articleQuery: (params) => http('post', `${apiBaseUrl}/article/query`, params),
    // 已发布文章点赞
    articleLike: (articleId) => http('get', `${apiBaseUrl}/article/like/${articleId}`),
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

    // 专题列表
    topicQuery: (params) => http('post', `${apiBaseUrl}/topic/query`, params),
    // 我的专题
    topicUserQuery: (params) => http('post', `${apiBaseUrl}/topic/user/query`, params),
    // 专题推荐
    topicRecommend: () => http('get', `${apiBaseUrl}/topic/recommend`),
    // 创建专题
    topicAdd: (params) => http('post', `${apiBaseUrl}/topic/add`, params),
    // 编辑专题
    topicEdit: (topicId, params) => http('put', `${apiBaseUrl}/topic/edit/${topicId}`, params),
    // 删除专题
    topicDelete: (topicId) => http('delete', `${apiBaseUrl}/topic/delete/${topicId}`),
    // 专题详情
    topicDetail: (params) => http('post', `${apiBaseUrl}/topic/detail`, params),
    // 专题文章
    topicArticleQuery: (params) => http('post', `${apiBaseUrl}/topic/article/query`, params),

    // Tag列表
    tagQuery: (params) => http('post', `${apiBaseUrl}/tag/query`, params),
    // Tag推荐
    tagRecommend: () => http('get', `${apiBaseUrl}/tag/recommend`),
    // tag详情
    tagDetail: (params) => http('post', `${apiBaseUrl}/tag/detail`, params),

    // 消息列表
    messageQuery: (params) => http('post', `${apiBaseUrl}/message/query`, params),

    // 收藏列表
    collectQuery: (params) => http('post', `${apiBaseUrl}/collect/query`, params),

    // 关注列表
    followUserQuery: (params) => http('post', `${apiBaseUrl}/follow/user/query`, params),
    followTopicQuery: (params) => http('post', `${apiBaseUrl}/follow/topic/query`, params),
    followTagQuery: (params) => http('post', `${apiBaseUrl}/follow/tag/query`, params),
    // 粉丝列表
    fansQuery: (params) => http('post', `${apiBaseUrl}/fans/query`, params),
    // 关注
    followUser: (params) => http('post', `${apiBaseUrl}/follow/user`, params),
    followTopic: (params) => http('post', `${apiBaseUrl}/follow/topic`, params),
    followTag: (params) => http('post', `${apiBaseUrl}/follow/tag`, params),
    // 发送邮件
    sendEmail: (params) => http('post', `${apiBaseUrl}/sendEmail`, params),

    // 删除对应文件
    deleteFile: (params) => http('post', `${apiBaseUrl}/deleteFile`, params)

};
