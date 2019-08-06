<template>
    <div class="user-avatar">
        <div class="img" @click="handleZone(userId)">
            <el-avatar :size="50">{{ userImg }}</el-avatar>
        </div>
        <div class="title">
            <div class="name">
                <strong @click="handleZone(userId)">{{ username }}</strong>
                <span v-if="userId !== mine" @click="handleFollow()">
                    <i v-if="!follow">+关注</i>
                    <i v-else>已关注</i>
                </span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserAvatar',
    props: {
        user: {
            type: Object,
            default: () => {}
        },
        follow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        mine() {
            return localStorage.getItem('userId');
        },
        userId() {
            return this.user._id;
        },
        username() {
            return this.user.username;
        },
        userImg() {
            if (this.username) return this.username.split('')[0].toUpperCase();
        }
    },
    methods: {
        handleFollow() {
            this.$emit('doFollow');
        },
        handleZone(userId) {
            this.$router.push(`/zone/${userId}/article`);
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
