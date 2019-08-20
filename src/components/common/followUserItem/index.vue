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
            if (this.item && this.item.followId) return this.item.followId.username;
        },
        userId() {
            if (this.item && this.item.followId) return this.item.followId._id;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/zone/${userId}/article`;
            this.$router.push({ path });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
