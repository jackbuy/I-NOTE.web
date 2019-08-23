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
import api from '@/utils/api';
export default {
    name: 'PublishModal',
    components: {
        Modal
    },
    props: {
        value: Boolean,
        data: Object
    },
    computed: {
        isVisible() {
            return this.value;
        }
    },
    data() {
        return {
            title: '发布',
            form: {},
            tagOptions: []
        };
    },
    created() {
        this.getArticleTag();
        if (this.data.tagId) this.form.tagId = this.data.tagId;
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        getArticleTag() {
            api.tagQuery().then((res) => {
                this.tagOptions = res.data;
            });
        },
        handlePublish() {
            const params = {
                ...this.data,
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
