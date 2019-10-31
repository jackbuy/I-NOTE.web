/**
 * 加入专题
 */

import api from '@/utils/api';
export default {
    data() {
        return {
            topicArticleAddModalVisible: false,
            topicList: [],
            activeArticleId: ''
        };
    },
    computed: {
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        handleAddTopic(articlePublishId) {
            this.topicArticleAddModalVisible = true;
            this.activeArticleId = articlePublishId;
            this.getIsTopicList(this.activeArticleId);
        },
        // 创建专题
        handleCreateTopic(title) {
            api.topicAdd({ title }).then((res) => {
                this.getIsTopicList(this.activeArticleId);
            }).catch(() => {});
        },
        // 获取专题列表
        getIsTopicList(articleId) {
            if (this.currentUserId) { // 登录用户才发请求
                const params = {
                    articleId,
                    pageSize: 10000,
                    currentPage: 1
                };
                api.getTopicList(params).then((res) => {
                    this.topicList = res.data;
                }).catch(() => {});
            }
        },
        // (取消)加入专题
        handleAddToTopic(row) {
            const { _id, isTopic } = row;
            if (!isTopic) {
                const params = {
                    topicId: _id,
                    articleId: this.activeArticleId
                };
                api.topicArticleAdd(params).then(() => {
                    this.getIsTopicList(this.activeArticleId);
                }).catch(() => {});
            } else {
                api.topicArticleDelete(_id, this.activeArticleId).then(() => {
                    this.getIsTopicList(this.activeArticleId);
                }).catch(() => {});
            }
        }
    }
};