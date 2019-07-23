<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px">
            <el-form-item
                label="标题">
                <el-input
                    v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item
                label="内容">
                <editor
                    v-model="form.contentHtml"
                    @get-text="handleGetText"></editor>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleAdd">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Editor from '@/components/common/editor';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Editor
    },
    data() {
        return {
            form: {
                title: '',
                contentText: '',
                contentHtml: ''
            },
            rules: {}
        };
    },
    methods: {
        handleAdd() {
            const params = {...this.form};
            api.articleAdd(params).then(() => {
                this.$router.push('/home');
            });
        },
        handleGetText(text) {
            this.form.contentText = text;
        }
    }
};
</script>
