<template>
    <div class="introduce">
        <div class="title"><span>I`NOTE</span>知识分享与交流的社区</div>
        <div class="des">您可以发布一个讨论话题，</div>
        <div class="des">也可以分享一些经验！</div>
        <div class="btn" @click="handleWrite">发帖子 / 分享经验</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL
} from '@/store/mutation-types';
export default {
    name: '',
    computed: {
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        }
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        handleWrite() {
            if (this.isLogin) {
                this.handleRouterPush('/write');
            } else {
                this.handleLog('login');
            }
        },
        handleRouterPush(path) {
            this.$router.push(path);
        },
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        }
    }
};
</script>
