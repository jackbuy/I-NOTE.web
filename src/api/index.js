import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    login: (params) => http('post', `${apiBaseUrl}/user/login`, params),
    // 检查密码是否有效
    checkpassword: (params) => http('post', `${apiBaseUrl}/user/password/check`, params),
    // 修改密码
    editpassword: (params) => http('put', `${apiBaseUrl}/user/password/edit`, params),

    // 获取用户列表
    getUserList: (params) => http('post', `${apiBaseUrl}/user/query`, params),
    // 获取用户详情
    getUserInfo: () => http('get', `${apiBaseUrl}/user/detail`),
    // 获取指定用户详情
    getPeopleInfo: (peopleId) => http('get', `${apiBaseUrl}/user/detail/${peopleId}`),
    // 编辑个人资料
    editUserInfo: (params) => http('put', `${apiBaseUrl}/user/edit/`, params),
    // 新增用户
    addUser: (params) => http('post', `${apiBaseUrl}/user/add`, params),
    // 编辑用户
    editUser: (params, id) => http('put', `${apiBaseUrl}/user/edit/${id}`, params),
    // 删除用户
    deleteUser: (id) => http('delete', `${apiBaseUrl}/user/delete/${id}`),

    // 获取角色列表
    getRoleList: () => http('get', `${apiBaseUrl}/user/cate/query`),
    // 新增角色
    addRole: (params) => http('post', `${apiBaseUrl}/user/cate/add`, params),
    // 编辑角色
    editRole: (params, id) => http('put', `${apiBaseUrl}/user/cate/edit/${id}`, params),
    // 删除角色
    deleteRole: (id) => http('delete', `${apiBaseUrl}/user/cate/delete/${id}`),

    // 获取当前用户系统列表
    getCurrentUserSystem: () => http('get', `${apiBaseUrl}/user/system/query/currentuser`),
    // 获取系统列表
    getSystemList: () => http('get', `${apiBaseUrl}/user/system/query`),
    // 新增系统
    addSystem: (params) => http('post', `${apiBaseUrl}/user/system/add`, params),
    // 编辑系统
    editSystem: (params, id) => http('put', `${apiBaseUrl}/user/system/edit/${id}`, params),
    // 删除系统
    deleteSystem: (id) => http('delete', `${apiBaseUrl}/user/system/delete/${id}`),

    // 获取当前用户功能列表
    getCurrentUserFunction: () => http('get', `${apiBaseUrl}/user/function/query/currentuser`),
    // 获取功能列表
    getFunctionList: () => http('get', `${apiBaseUrl}/user/function/query`),
    // 新增功能
    addSystemFunction: (params) => http('post', `${apiBaseUrl}/user/function/add`, params),
    // 编辑功能
    editSystemFunction: (params, id) => http('put', `${apiBaseUrl}/user/function/edit/${id}`, params),
    // 删除功能
    deleteSystemFunction: (id) => http('delete', `${apiBaseUrl}/user/function/delete/${id}`),

    /**
     * 大厅
     */
    // 已发布的文章
    getArticleListAll: (params) => http('post', `${apiBaseUrl}/article/publish/query`, params),
    // 当前用户数量统计
    getCurrentUserCount: () => http('get', `${apiBaseUrl}/user/count/query`),

    /**
     * 文章
     */
    // 列表
    getArticleList: (params) => http('post', `${apiBaseUrl}/article/query`, params),
    // 新增
    addArticle: (params) => http('post', `${apiBaseUrl}/article/add`, params),
    // 编辑
    editArticle: (params, id) => http('put', `${apiBaseUrl}/article/edit/${id}`, params),
    // 删除
    deleteArticle: (id) => http('delete', `${apiBaseUrl}/article/delete/${id}`),
    // 批量删除
    deleteArticles: (params) => http('post', `${apiBaseUrl}/article/delete_many`, params),
    // 详情
    getArticleDetail: (id) => http('get', `${apiBaseUrl}/article/detail/${id}`),
    // 设置浏览次数
    setArticleReadCount: (params, id) => http('put', `${apiBaseUrl}/article/set_read_count/${id}`, params),
    // 发布/取消发布
    isPublishArticle: (params, id) => http('put', `${apiBaseUrl}/article/publish/${id}`, params),

    /**
     * 文章分类
     */
    // 列表
    getCateList: () => http('get', `${apiBaseUrl}/article/cate/query`),
    // 新增
    addArticleCate: (params) => http('post', `${apiBaseUrl}/article/cate/add`, params),
    // 编辑
    editArticleCate: (params, id) => http('put', `${apiBaseUrl}/article/cate/edit/${id}`, params),
    // 删除
    deleteArticleCate: (id) => http('delete', `${apiBaseUrl}/article/cate/delete/${id}`),

    /**
     * 便签
     */
    // 列表
    getNoteList: (params) => http('post', `${apiBaseUrl}/note/query`, params),
    // 删除
    deleteNote: (id) => http('delete', `${apiBaseUrl}/note/${id}`),
    // 批量删除
    deleteNotes: (params) => http('post', `${apiBaseUrl}/note/deletes`, params),
    // 新增
    addNote: (params) => http('post', `${apiBaseUrl}/note`, params),
    // 编辑
    editNote: (params, id) => http('put', `${apiBaseUrl}/note/${id}`, params),

    /**
     * 收藏
     */
    // 获取当前用户所有收藏列表
    getCollectionListAll: () => http('get', `${apiBaseUrl}/article/collect/queryall`),
    // 列表
    getCollectionList: (params) => http('post', `${apiBaseUrl}/article/collect/query`, params),
    // 删除
    deleteCollection: (params) => http('post', `${apiBaseUrl}/article/collect/delete`, params),
    // 新增
    addCollection: (params) => http('post', `${apiBaseUrl}/article/collect/add`, params),

    /**
     * 消息
     */
    // 列表
    getMsgList: (params) => http('post', `${apiBaseUrl}/message/query`, params),
    // 新增
    addMsg: (params) => http('post', `${apiBaseUrl}/message/add`, params),
    // 批量删除
    deleteMsgs: (params) => http('post', `${apiBaseUrl}/message/delete_many`, params),
    // 批量标记已读
    readMsgs: (params) => http('post', `${apiBaseUrl}/message/read_many`, params),

    /**
     * 设置
     */
    // 系统基本信息 - 编辑
    editSystemInfo: (params, id) => http('put', `${apiBaseUrl}/system/info/edit/${id}`, params),
    // 系统基本信息-详情
    getSystemInfo: () => http('get', `${apiBaseUrl}/system/info/detail`),
    // 关于系统 - 编辑
    editSystemAbout: (params, id) => http('put', `${apiBaseUrl}/system/about/edit/${id}`, params),
    // 关于系统-详情
    getSystemAbout: () => http('get', `${apiBaseUrl}/system/about/detail`),

    /**
     * 搜索
     */
    searchCmsList: (params) => http('post', `${apiBaseUrl}/search/article/publish/query`, params),
    // 已发布文章数量
    getArticleListAllCount: () => http('get', `${apiBaseUrl}/article/publish/count/query`),

    /**
     * 关注
     */
    // 加关注
    addFollow: (params) => http('post', `${apiBaseUrl}/follow/add`, params),
    // 取消关注
    deleteFollow: (id) => http('delete', `${apiBaseUrl}/follow/delete/${id}`),
    // 当前用户关注列表
    getCurrentUserFollow: () => http('get', `${apiBaseUrl}/follow/query`),

    /**
     * 个人主页
     */
    // 指定用户查询文章列表
    getPeopleArticleList: (params, id) => http('post', `${apiBaseUrl}/zone/article/query/${id}`, params),
    // 指定用户查询关注列表
    getPeopleFolowList: (params, id) => http('post', `${apiBaseUrl}/zone/follow/query/${id}`, params),
    // 指定用户查询粉丝列表
    getPeopleFansList: (params, id) => http('post', `${apiBaseUrl}/zone/fans/query/${id}`, params)
};
