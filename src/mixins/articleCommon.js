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
            this.$router.push(`/write/${articleId}`);
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
        handleSupport(articleId, type) {
            this.loading = true;
            api.articleSupport(articleId).then(() => {
                this.listData.map((item) => {
                    if (item._id === articleId) {
                        if (!type) {
                            item.isSupport = true;
                            item.supportCount++;
                        } else {
                            item.isSupport = false;
                            item.supportCount--;
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
