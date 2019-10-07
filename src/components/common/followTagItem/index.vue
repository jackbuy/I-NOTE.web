<template>
    <div class="follow-tag__item">
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
            if (this.item && this.item.followTagId) return this.item.followTagId.title;
        },
        tagId() {
            if (this.item && this.item.followTagId) return this.item.followTagId._id;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/tag/${userId}`;
            this.$router.push({ path }).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
