<template>
    <modal
        :title="modalTitle"
        :visible="isVisible"
        @handleClose="handleClose">
        <div class="topic-article-add">
            <el-form v-if="createTopic" :inline="true">
                <el-form-item>
                    <el-input v-model="form.title" placeholder="请输入专题名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave">确定</el-button>
                    <el-button @click="handleToggle">取消</el-button>
                </el-form-item>
            </el-form>
            <ul v-else>
                <li class="add" @click="handleToggle">
                    <i class="el-icon-circle-plus"></i>
                    创建新专题
                </li>
                <li
                    v-for="item in data"
                    :key="item._id"
                    :class="{'active': item.isTopic}"
                    @click="handleAdd(item)">
                    <i :class="{'icon icon-fuxuankuang': !item.isTopic, 'icon icon-checkboxnon': item.isTopic}"></i>
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </modal>
</template>

<script>
import Modal from '@/components/common/modal';
export default {
    name: 'TopicArticleAddModal',
    components: {
        Modal
    },
    props: {
        value: Boolean,
        data: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isVisible() {
            return this.value;
        },
        modalTitle() {
            return this.createTopic ? '创建专题' : '收入专题';
        }
    },
    data() {
        return {
            createTopic: false,
            form: {}
        };
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        handleAdd(item) {
            this.$emit('addToTopic', item);
        },
        handleToggle() {
            this.form = {};
            this.createTopic = !this.createTopic;
        },
        handleSave() {
            this.$emit('createTopic', this.form.title || '未命名专题');
            this.handleToggle();
        }
    }
};
</script>

<style>
.width100{
    width: 100%;
}
</style>
