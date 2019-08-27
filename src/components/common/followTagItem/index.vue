<template>
    <div class="follow-user__item">
        <span
            class="name"
            @click="handleRouterPush(tagId)">
            {{ title }}
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
        title() {
            if (this.item && this.item.followId) return this.item.followId.title;
        },
        tagId() {
            if (this.item && this.item.followId) return this.item.followId._id;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/tag/${userId}`;
            this.$router.push({ path });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
