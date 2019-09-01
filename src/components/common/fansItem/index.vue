<template>
    <div class="fans__item">
        <span
            class="name"
            @click="handleRouterPush(userId)">
            {{ username }}
        </span>
    </div>
</template>

<script>
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
