<template>
    <page-loading :loading="loading">
        <div v-if="isHas" class="topic-article-detail">
            <div class="topic-article-detail__side">
                <slot name="list"></slot>
            </div>
            <div class="topic-article-detail__content">
                <slot name="content"></slot>
            </div>
        </div>
        <div v-else class="no-has">文章不存在</div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    name: 'TopicArticleDetail',
    components: {
        PageLoading
    },
    props: {
        isHas: Boolean,
        loading: Boolean
    }
};
</script>
