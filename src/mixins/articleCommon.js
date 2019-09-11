import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    mixins: [ message ],
    computed: {
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        // 跳转文章编辑
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`).catch(() => {});
        },
        // 跳转到评论
        handleComment(row) {
            const { _id } = row;
            this.$router.push(`/detail/${_id}`).catch(() => {});
        },
        // 收藏
        handleCollect(row) {
            const { _id, title, isCollect } = row;
            const params = {
                articleId: _id,
                articleTitle: title
            };
            this.loading = true;
            api.articleCollect(params).then(() => {
                this.listData.map((item) => {
                    if (item.articleId) { // 专题文章
                        if (item.articleId._id === _id) {
                            if (!isCollect) {
                                item.articleId.isCollect = true;
                                item.articleId.collectCount++;
                            } else {
                                item.articleId.isCollect = false;
                                item.articleId.collectCount--;
                            }
                        }
                    } else { // 文章
                        if (item._id === _id) {
                            if (!isCollect) {
                                item.isCollect = true;
                                item.collectCount++;
                            } else {
                                item.isCollect = false;
                                item.collectCount--;
                            }
                        }
                    }
                });
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 赞
        handleLike(row) {
            const { _id, isLike } = row;
            const params = {
                articleId: _id
            };
            this.loading = true;
            api.articleLike(params).then(() => {
                this.listData.map((item) => {
                    if (item.articleId) { // 专题文章
                        if (item.articleId._id === _id) {
                            if (!isLike) {
                                item.articleId.isLike = true;
                                item.articleId.likeCount++;
                            } else {
                                item.articleId.isLike = false;
                                item.articleId.likeCount--;
                            }
                        }
                    } else { // 文章
                        if (item._id === _id) {
                            if (!isLike) {
                                item.isLike = true;
                                item.likeCount++;
                            } else {
                                item.isLike = false;
                                item.likeCount--;
                            }
                        }
                    }
                });
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
