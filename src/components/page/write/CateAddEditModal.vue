<template>
    <modal
        :title="modelTitle"
        :visible="isVisible"
        @handleClose="handleClose">
        <el-input
            v-model.trim="form.title"
            placeholder="请输入分组名称"
            @keyup.enter.native="handleSave"></el-input>
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
import message from '@/mixins/message';
export default {
    name: 'CateModal',
    components: {
        Modal
    },
    mixins: [message],
    props: {
        value: Boolean,
        title: String,
        modalType: String,
        data: {
            type: Array,
            default: () => []
        }
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
        // 验证分组名是否重复
        isHasCateTitle(title) {
            let result = false;
            this.data.map((item) => {
                if (item.title === title) result = true;
            });
            return result;
        },
        handleSave() {
            const params = {
                type: this.modalType,
                ...this.form
            };
            if (this.isHasCateTitle(this.form.title)) {
                this.showWarningMsg('分组名重复, 请修改！');
                return;
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
