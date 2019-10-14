<template>
    <page-loading :loading="loading">
        <div v-if="isHas" class="tag-article">
            <div class="tag-article__content">
                <slot name="content"></slot>
            </div>
            <div class="tag-article__side">
                <div class="fixed">
                    <slot name="detail"></slot>
                </div>
            </div>
        </div>
        <div v-else class="no-has">标签不存在</div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    name: 'TagArticle',
    components: {
        PageLoading
    },
    props: {
        isHas: Boolean,
        loading: Boolean
    }
};
</script>
