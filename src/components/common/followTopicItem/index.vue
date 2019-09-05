<template>
    <div class="follow-topic__item">
        <span
            class="img"
            @click="handleRouterPush(topicId)">
            <img :src="img" alt="">
        </span>
        <span
            class="name"
            @click="handleRouterPush(topicId)">
            {{ title }}
        </span>
    </div>
</template>

<script>
// import { imgBaseUrl } from '@/constants/url-config';
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
            if (this.item && this.item.followTopicId) return this.item.followTopicId.title;
        },
        topicId() {
            if (this.item && this.item.followTopicId) return this.item.followTopicId._id;
        },
        img() {
            if (this.item && this.item.followTopicId) return `${this.item.followTopicId.img}`;
        }
    },
    methods: {
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path }).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
