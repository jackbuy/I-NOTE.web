<template>
    <div class="topic-article-detail">
        <div class="topic-article-detail__side">
            <slot name="list"></slot>
        </div>
        <div class="topic-article-detail__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopicArticleDetail'
};
</script>
