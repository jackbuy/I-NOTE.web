<template>
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
</template>

<script>
export default {
    name: '',
    props: {
        isHas: Boolean
    }
};
</script>

<style lang="less">
    @import './layout.less';
</style>
