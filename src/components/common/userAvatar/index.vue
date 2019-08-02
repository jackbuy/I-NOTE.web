<template>
    <div class="user-avatar">
        <div class="img">
            <el-avatar :size="50">{{ userImg }}</el-avatar>
        </div>
        <div class="title">
            <div class="name">
                {{ username }}
                <span @click="handleFollow()">
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
        username() {
            return this.user.username;
        },
        userImg() {
            return this.username.split('')[0].toUpperCase();
        }
    },
    methods: {
        handleFollow() {
            this.$emit('doFollow');
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
