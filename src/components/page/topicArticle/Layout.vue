<template>
    <page-loading :loading="loading">
        <div v-if="isHas" class="topic-article">
            <div class="topic-article__content">
                <slot name="content"></slot>
            </div>
            <div class="topic-article__side">
                <div class="fixed">
                    <slot name="topicDetail"></slot>
                    <slot name="author"></slot>
                </div>
            </div>
        </div>
        <div v-else class="no-has">专题不存在</div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    name: 'TopicArticle',
    components: {
        PageLoading
    },
    props: {
        isHas: Boolean,
        loading: Boolean
    }
};
</script>
