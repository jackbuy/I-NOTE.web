<template>
    <div class="online">
        <div>注册会员：{{ userCount }}</div>
        <div>在线会员：{{ onlineMember }}</div>
        <div>发布文章：{{ articlePublishCount }}</div>
        <div>在线游客：{{ onlineVisitor }}</div>
        <div>共享专题：{{ topicCount }}</div>
        <div>链接：{{onlineConnect}}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: '',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            onlineMember: 0,
            onlineVisitor: 0,
            onlineConnect: 0
        };
    },
    computed: {
        ...mapState({
            socketOnlineUser: state => state.socketOnlineUser
        }),
        userCount() {
            return this.data.userCount || 0;
        },
        articlePublishCount() {
            return this.data.articlePublishCount || 0;
        },
        topicCount() {
            return this.data.topicCount || 0;
        }
    },
    watch: {
        socketOnlineUser: {
            handler(n, o) {
                if (n === o) return;
                if (n) {
                    this.onlineMember = n.member || 0;
                    this.onlineVisitor = n.visitor || 0;
                    this.onlineConnect = n.connect || 0;
                }
            },
            immediate: true
        }
    }
};
</script>
