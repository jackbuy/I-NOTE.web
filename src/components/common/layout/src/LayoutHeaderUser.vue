<template>
    <div class="layout__header-login">
        <div v-if="!isLogin">
            <span @click="handleLog('login')">登录</span>
            <span @click="handleLog('register')">注册</span>
        </div>
        <div v-else>
            <el-dropdown v-if="!isWrite" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-plus"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="article">写文章</el-dropdown-item>
                    <el-dropdown-item command="topic">创建专题</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <span v-else @click="handleRoutePush('/article/draft')"><i class="el-icon-suitcase"></i> 草稿箱</span> -->
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ userName }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zone">我的空间</el-dropdown-item>
                    <!-- <el-dropdown-item command="ww">设置</el-dropdown-item> -->
                    <el-dropdown-item divided command="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL,
    GET_USER_INFO
} from '@/store/mutation-types';
export default {
    name: 'LayoutHeaderUser',
    props: {
        isWrite: Boolean
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
        userName() {
            return this.userInfo.username;
        },
        userId() {
            return this.userInfo._id;
        },
        isLogin() {
            if (localStorage.getItem('userId') && localStorage.getItem('token')) return true;
        }
    },
    created() {
        if (this.isLogin) {
            const params = {
                userId: localStorage.getItem('userId')
            };
            this.getUserInfo(params);
        }
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        ...mapActions({
            getUserInfo: GET_USER_INFO
        }),
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        },
        handleLogOut() {
            localStorage.clear();
            window.location.reload();
        },
        handleRoutePush(url) {
            this.$router.push(url);
        },
        handleCommand(command) {
            if (command === 'loginOut') this.handleLogOut();
            if (command === 'article') this.handleRoutePush(`/write`);
            if (command === 'topic') this.handleRoutePush(`/topicAdd`);
            if (command === 'zone') this.handleRoutePush(`/zone/${this.userId}/article`);
        }
    }
};
</script>
