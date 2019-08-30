<template>
    <div class="follow-user__item">
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
            if (this.item && this.item.followUserId) return this.item.followUserId.nickname ? this.item.followUserId.nickname : this.item.followUserId.username;
        },
        userId() {
            if (this.item && this.item.followUserId) return this.item.followUserId._id;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/zone/${userId}/article`;
            this.$router.push(path);
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
