<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :width="width"
        :append-to-body="true"
        :close-on-click-modal="false"
        @close="handleClose">
        <slot></slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '400px'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClose() {
            this.$emit('handleClose');
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
