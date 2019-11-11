<template>
    <div class="article-content">
        <div v-if="showTitle" class="article-content__title">
            {{ title }}
        </div>
        <div
            v-highlightA
            v-html="content"
            class="article-content__content">
        </div>
        <div v-if="showInfo" class="article-content__info">
            <span>{{ time }}</span>
            <span>浏览 {{ viewCount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleContent',
    props: {
        title: String,
        content: String,
        time: String,
        viewCount: Number,
        showInfo: {
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    }
};
</script>
