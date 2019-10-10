<template>
    <div
        class="special-topic"
        @click="handleRouterPush(id)">
        <div class="img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
        <div class="content">
            <div class="title">{{ title }}</div>
            <div class="description">{{ description }}</div>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'ArticleTagItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        id(id) {
            return this.item._id;
        },
        title() {
            return this.item.title || '未命名专题';
        },
        img() {
            return this.item.img ? `${imgBaseUrl}/${this.item.img}` : '';
        },
        followCount() {
            return this.item.followCount;
        },
        articleCount() {
            return this.item.articleCount;
        },
        description() {
            return `文章：${this.articleCount} / 关注：${this.followCount}`;
        }
    },
    methods: {
        handleRouterPush(id) {
            this.$router.push({
                path: `/topic/${id}`
            }).catch(() => {});
        }
    }
};
</script>
