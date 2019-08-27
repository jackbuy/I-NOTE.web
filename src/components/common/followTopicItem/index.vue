<template>
    <div class="follow-user__item">
        <span
            class="name"
            @click="handleRouterPush(topicId)">
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
        topicId() {
            if (this.item && this.item.followId) return this.item.followId._id;
        }
    },
    methods: {
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
