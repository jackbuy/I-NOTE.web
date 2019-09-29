<template>
    <modal
        :title="title"
        :visible="isVisible"
        @handleClose="handleClose">
        <el-select
            v-model="form.tagId"
            :popper-append-to-body="false"
            class="width100"
            clearable
            filterable
            placeholder="选择一个标签( 可搜索 )">
            <el-option
                v-for="item in tagOptions"
                :key="item._id"
                :label="item.title"
                :value="item._id">
            </el-option>
        </el-select>
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
        tagId: String,
        tagOptions: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isVisible() {
            return this.value;
        }
    },
    data() {
        return {
            title: '发布设置',
            form: {
                tagId: this.tagId
            }
        };
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        handlePublish() {
            const params = {
                publish: true,
                ...this.form
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
