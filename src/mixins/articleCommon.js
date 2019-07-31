import message from '@/mixins/message';
export default {
    mixins: [ message ],
    computed: {
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`);
        },
        confirmDelete() {
            return this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            });
        }
    }
};
