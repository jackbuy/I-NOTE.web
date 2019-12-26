/**
 * 收入专题
 */

import { mapGetters } from 'vuex';
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
        ...mapGetters({
            currentUserId: 'currentUserId'
        })
    },
    methods: {
        handleAddTopic(articlePublishId) {
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
            return new Promise((resolve, reject) => {
                const params = {
                    articleId,
                    pageSize: 10000,
                    currentPage: 1
                };
                api.getTopicList(params).then((res) => {
                    this.topicList = res.data;
                    this.topicArticleAddModalVisible = true;
                }).catch(() => {});
            });
        },
        // (取消)收入专题
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
