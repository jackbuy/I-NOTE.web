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
    .el-dialog__title{
        font-size: 16px;
    }
    .el-dialog__header{
        border-bottom: 1px solid #eee;
        padding: 15px;
    }
    .el-dialog__body{
        padding: 20px;
    }
    .el-form-item{
        &:last-child{
            margin-bottom: 10px;
        }
    }
</style>
