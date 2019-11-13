<template>
    <modal
        :title="modalTitle"
        :visible="isVisible"
        @handleClose="handleClose">
        <el-cascader
            v-model="form.tagId"
            placeholder="选择一个话题( 可搜索 )"
            :options="tagOptions"
            :props="props"
            class="width100"
            filterable>
        </el-cascader>
        <el-button
            :disabled="!form.tagId"
            class="mt15"
            size="mini"
            style="width: 100%"
            type="primary"
            @click="handlePublish">确定</el-button>
    </modal>
</template>

<script>
import Modal from '@/components/common/modal';
export default {
    name: 'PublishModal',
    components: {
        Modal
    },
    props: {
        value: Boolean,
        isUpdatePublish: Boolean,
        tagId: String,
        tagOptions: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isVisible() {
            return this.value;
        },
        modalTitle() {
            return this.isUpdatePublish ? '更新发布' : '发布';
        }
    },
    data() {
        return {
            form: {
                tagId: this.tagId
            },
            props: {
                // checkStrictly: true,
                label: 'title',
                value: '_id'
            }
        };
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        handlePublish() {
            const params = {
                tagId: typeof this.form.tagId === 'object' ? this.form.tagId[this.form.tagId.length - 1] : this.form.tagId
            };
            this.$emit('handlePublish', params);
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
