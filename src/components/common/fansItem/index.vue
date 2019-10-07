<template>
    <div class="fans__item">
        <span
            class="img"
            @click="handleRouterPush(userId)">
            <img :src="avatar" alt="">
        </span>
        <span
            class="name"
            @click="handleRouterPush(userId)">
            {{ username }}
        </span>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'FansItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        username() {
            if (this.item && this.item.userId) return this.item.userId.nickname ? this.item.userId.nickname : this.item.userId.username;
        },
        userId() {
            if (this.item && this.item.userId) return this.item.userId._id;
        },
        avatar() {
            if (this.item && this.item.userId) return `${imgBaseUrl}/${this.item.userId.avatar}`;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/zone/${userId}/article`;
            this.$router.push({ path }).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
