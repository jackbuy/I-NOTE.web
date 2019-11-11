<template>
    <modal
        :title="modelTitle"
        :visible="isVisible"
        @handleClose="handleClose">
        <el-input
            v-model.trim="form.title"
            placeholder="请输入分组名称"></el-input>
        <el-button
            :disabled="!form.title"
            class="mt15"
            size="mini"
            style="width: 100%"
            type="primary"
            @click="handleSave">确定</el-button>
    </modal>
</template>

<script>
import Modal from '@/components/common/modal';
export default {
    name: 'CateModal',
    components: {
        Modal
    },
    props: {
        value: Boolean,
        title: String,
        modalType: String
    },
    data() {
        return {
            form: {
                title: this.title
            }
        };
    },
    computed: {
        isVisible() {
            return this.value;
        },
        modelTitle() {
            return this.modalType === 'add' ? '新建分组' : '重命名分组';
        }
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        handleSave() {
            const params = {
                type: this.modalType,
                ...this.form
            };
            this.$emit('save', params);
            this.handleClose();
        }
    }
};
</script>

<style>
.width100{
    width: 100%;
}
</style>
