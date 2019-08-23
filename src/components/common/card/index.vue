<template>
    <div class="card">
        <div v-if="visible" class="card__title">
            <div class="tit"><i v-if="icon" :class="icon"></i>{{ title }}</div>
            <slot name="menu"></slot>
        </div>
        <div class="card__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        icon: String,
        visible: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
