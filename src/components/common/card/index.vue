<template>
    <div class="card">
        <div class="card__title">
            <div class="tit"><i v-if="icon" :class="icon"></i>{{ title }}</div>
            <slot name="menu"></slot>
        </div>
        <div class="card__content">
            <slot></slot>
            <template v-if="value && value.length > 0">
                <slot name="content"></slot>
            </template>
            <template v-if="value && value.length === 0">
                <div class="norecord">暂无数据！</div>
            </template>
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
        value: Array
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
