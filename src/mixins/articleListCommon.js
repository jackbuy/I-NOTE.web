import message from '@/mixins/message';
import scrollEvent from '@/mixins/scrollEvent';
import api from '@/utils/api';
export default {
    mixins: [ message, scrollEvent ],
    computed: {
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        // 跳转编辑
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`);
        },
        // 收藏
        handleCollect(articleId, type) {
            api.articleCollect(articleId).then(() => {
                this.articleData.map((item) => {
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
            });
        },
        // 赞
        handleSupport(articleId, type) {
            api.articleSupport(articleId).then(() => {
                this.articleData.map((item) => {
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
            });
        }
    }
};
