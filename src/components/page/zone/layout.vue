<template>
    <div class="zone">
        <div class="zone__header">
            <slot name="header"></slot>
        </div>
        <div class="zone__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayOut',
    props: {}
};
</script>

<style lang="less">
    @import './layout.less';
</style>
