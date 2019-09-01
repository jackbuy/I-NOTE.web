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
        // 收藏
        handleCollect(articleId, type) {
            this.loading = true;
            api.articleCollect(articleId).then(() => {
                this.listData.map((item) => {
                    if (item._id === articleId) {
                        if (!type) {
                            item.isCollect = true;
                            item.collectCount++;
                        } else {
                            item.isCollect = false;
                            item.collectCount--;
                        }
                    }
                });
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 赞
        handleLike(articleId, type) {
            this.loading = true;
            api.articleLike(articleId).then(() => {
                this.listData.map((item) => {
                    if (item._id === articleId) {
                        if (!type) {
                            item.isLike = true;
                            item.likeCount++;
                        } else {
                            item.isLike = false;
                            item.likeCount--;
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
