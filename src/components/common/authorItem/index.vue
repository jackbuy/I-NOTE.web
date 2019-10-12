<template>
    <div
        class="author-item"
        @click="handleZone(userId)">
        <div v-if="imgUrl" class="img" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
        <div v-else class="img"><i class="icon icon-yonghu"></i></div>
        <div class="content">
            <div class="title">{{ username }}</div>
            <div class="info">
                <span>文章 {{ articleCount }}</span>
                <span>粉丝 {{ fansCount }}</span>
            </div>
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
        userId() {
            return this.item._id;
        },
        username() {
            return this.item.nickname ? this.item.nickname : this.item.username;
        },
        imgUrl() {
            return this.item && this.item.avatar ? `${imgBaseUrl}/${this.item.avatar}` : '';
        },
        articleCount() {
            return this.item.articleCount;
        },
        fansCount() {
            return this.item.fansCount;
        }
    },
    methods: {
        handleZone(userId) {
            this.$router.push(`/zone/${userId}/article`).catch(() => {});
        }
    }
};
</script>
