<template>
    <div v-if="isHas" class="detail">
        <slot name="menu"></slot>
        <div class="detail-content">
            <slot name="author"></slot>
            <slot name="content"></slot>
            <slot name="comment"></slot>
            <slot name="recommend"></slot>
        </div>
        <div class="detail-side">
            <div class="fixed">
                <slot name="userinfo"></slot>
            </div>
        </div>
    </div>
    <div v-else class="no-has">文章不存在</div>
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
