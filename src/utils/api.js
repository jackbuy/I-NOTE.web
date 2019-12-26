import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    userLogin: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 用户注册
    userRegister: (params) => http('post', `${apiBaseUrl}/user/register`, params),
    // 忘记密码
    userForget: (params) => http('post', `${apiBaseUrl}/user/forget`, params),
    // 已登录用户信息
    getUserInfo: (params) => http('post', `${apiBaseUrl}/user/userInfo`, params),
    // 空间用户信息
    getZoneUserInfo: (params) => http('post', `${apiBaseUrl}/user/zoneUserInfo`, params),
    // 编辑用户信息
    userInfoEdit: (params) => http('post', `${apiBaseUrl}/user/userInfoEdit`, params),
    // 用户公开列表
    userPublishQuery: (params) => http('post', `${apiBaseUrl}/user/publish/query`, params),
    // 用户列表
    userQuery: (params) => http('post', `${apiBaseUrl}/user/query`, params),
    // 数量统计
    operationsCount: () => http('post', `${apiBaseUrl}/operations/count`),

    /**
     * 未发布文章
     */

    // 列表
    articleQuery: (params) => http('post', `${apiBaseUrl}/article/query`, params),
    // 详情
    articleDetail: (articleId) => http('get', `${apiBaseUrl}/article/detail/${articleId}`),
    // 新增
    articleAdd: (params) => http('post', `${apiBaseUrl}/article/add`, params),
    // 编辑
    articleEdit: (articleId, params) => http('put', `${apiBaseUrl}/article/edit/${articleId}`, params),
    // 文章删除
    articleDelete: (articleId) => http('delete', `${apiBaseUrl}/article/delete/${articleId}`),

    /**
     * 已发布文章
     */

    // 列表
    articlePublishQuery: (params) => http('post', `${apiBaseUrl}/article/publish/query`, params),
    // 发布
    articlePublish: (params) => http('post', `${apiBaseUrl}/article/publish`, params),
    // 更新发布
    articlePublishUpdate: (articlePublishId, params) => http('put', `${apiBaseUrl}/article/publish/update/${articlePublishId}`, params),
    // 删除发布
    articlePublishDelete: (articlePublishId, articleId) => http('delete', `${apiBaseUrl}/article/publish/delete/${articlePublishId}/${articleId}`),
    // 详情
    articlePublishDetail: (params) => http('post', `${apiBaseUrl}/article/publish/detail`, params),
    // 点赞
    articlePublishLike: (params) => http('post', `${apiBaseUrl}/article/publish/like`, params),
    // 收藏
    articlePublishCollect: (params) => http('post', `${apiBaseUrl}/article/publish/collect`, params),

    /**
     * 文章分类（文件夹）
     */

    // 列表
    articleCateQuery: (params) => http('post', `${apiBaseUrl}/article/cate/query`, params),
    // 新增
    articleCateAdd: (params) => http('post', `${apiBaseUrl}/article/cate/add`, params),
    // 编辑
    articleCateEdit: (params, cateId) => http('put', `${apiBaseUrl}/article/cate/edit/${cateId}`, params),
    // 删除
    articleCateDelete: (cateId) => http('delete', `${apiBaseUrl}/article/cate/delete/${cateId}`),

    // 专题列表
    topicQuery: (params) => http('post', `${apiBaseUrl}/topic/query`, params),
    // 我的专题
    topicUserQuery: (params) => http('post', `${apiBaseUrl}/topic/user/query`, params),
    // 我的专题 - 返回文章是否收入专题
    getTopicList: (params) => http('post', `${apiBaseUrl}/topic/user/list`, params),
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
    // 专题文章添加
    topicArticleAdd: (params) => http('post', `${apiBaseUrl}/topic/article/add`, params),
    // 专题文章删除
    topicArticleDelete: (topicId, articleId) => http('delete', `${apiBaseUrl}/topic/${topicId}/article/delete/${articleId}`),

    // Tag列表
    tagQuery: () => http('post', `${apiBaseUrl}/tag/query`),
    // Tag子级列表
    tagChildQuery: () => http('post', `${apiBaseUrl}/tag/child/query`),
    // Tag推荐
    tagRecommend: () => http('get', `${apiBaseUrl}/tag/recommend`),
    // tag详情
    tagDetail: (params) => http('post', `${apiBaseUrl}/tag/detail`, params),

    // 消息列表
    messageQuery: (params) => http('post', `${apiBaseUrl}/message/query`, params),
    // 未读消息数量
    // getNewMessageCount: (params) => http('post', `${apiBaseUrl}/message/unRead/query/count`, params),
    // 标记为已读
    messageRead: (messageId) => http('put', `${apiBaseUrl}/message/read/${messageId}`),
    // 消息删除
    messageDelete: (messageId) => http('delete', `${apiBaseUrl}/message/delete/${messageId}`),

    // 收藏列表
    collectQuery: (params) => http('post', `${apiBaseUrl}/collect/query`, params),
    // 收藏删除
    collectDelete: (collectId, articleId) => http('delete', `${apiBaseUrl}/collect/delete/${collectId}/${articleId}`),

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

    // 发送新用户注册邮件
    sendRegisterEmail: (params) => http('post', `${apiBaseUrl}/sendRegisterEmail`, params),
    // 发送重置密码邮件
    sendForgetEmail: (params) => http('post', `${apiBaseUrl}/sendForgetEmail`, params),

    // 评论
    commentQuery: (params) => http('post', `${apiBaseUrl}/comment/query`, params),
    commentUserQuery: (params) => http('post', `${apiBaseUrl}/comment/user/query`, params),
    commentSave: (params) => http('post', `${apiBaseUrl}/comment/save`, params),
    commentReply: (params) => http('post', `${apiBaseUrl}/comment/reply`, params),
    commentDelete: (commentId, params) => http('post', `${apiBaseUrl}/comment/delete/${commentId}`, params),

    // 单文件上传
    fileSingleUpload: (params) => http('post', `${apiBaseUrl}/file/single/upload`, params),

    // 私信
    // 新增编辑
    letterUserAdd: (toUserId) => http('post', `${apiBaseUrl}/letterUser/add/${toUserId}`),
    // 列表
    letterUserQuery: (params) => http('post', `${apiBaseUrl}/letterUser/query`, params),
    // 清空数量
    letterUserClearCount: (params) => http('post', `${apiBaseUrl}/letterUser/clear/count`, params),
    // 列表
    letterQuery: (params) => http('post', `${apiBaseUrl}/letter/query`, params),
    // 新增
    letterAdd: (params) => http('post', `${apiBaseUrl}/letter/add`, params)

};
