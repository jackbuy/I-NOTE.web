<template>
    <div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="50px">
            <el-form-item
                prop="title"
                label="标题">
                <el-input
                    v-model="form.title"
                    placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item
                label="发布">
                <el-switch
                    v-model="form.publish"
                    active-color="#13ce66"
                    inactive-color="#ccc">
                </el-switch>
            </el-form-item>
            <el-form-item
                v-if="form.publish"
                label="标签">
                <el-select v-model="form.tagName" filterable placeholder="请选择 ( 可搜索 )">
                    <el-option
                        v-for="item in tagOptions"
                        :key="item.name"
                        :label="item.title"
                        :value="item.name">
                    </el-option>
                </el-select>
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
                    @click="handleSave">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Editor from '@/components/common/editor';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Editor
    },
    mixins: [ message ],
    data() {
        return {
            form: {
                title: '',
                contentText: '',
                contentHtml: '',
                publish: false,
                tagName: ''
            },
            tagOptions: [],
            rules: {
                title: [
                    {
                        required: true, message: '必填'
                    }
                ]
            }
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        }
    },
    watch: {
        $route(to, from) {
            if (to.path === '/write') {
                this.form = {
                    title: '',
                    contentText: '',
                    contentHtml: '',
                    publish: false,
                    tagName: ''
                };
            }
        }
    },
    created() {
        if (this.articleId) this.getDetail(this.articleId);
        this.getArticleTag();
    },
    methods: {
        getDetail(articleId) {
            api.getDetail({ articleId }).then((res) => {
                const { title, contentText, contentHtml, publish, tagName } = res.data;
                this.form = {
                    title,
                    contentText,
                    contentHtml,
                    publish,
                    tagName
                };
            });
        },
        handleSave() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const params = {
                        ...this.form
                    };
                    if (this.articleId) {
                        api.articleEdit(this.articleId, params).then(() => {
                            this.showSuccessMsg('保存成功！');
                        });
                    } else {
                        api.articleAdd(params).then((res) => {
                            const { articleId } = res.data;
                            this.$router.push(`/write/${articleId}`);
                            this.showSuccessMsg('保存成功！');
                        });
                    }
                }
            });
        },
        handleGetText(text) {
            this.form.contentText = text;
        },
        getArticleTag() {
            const params = {
                pageSize: 1000,
                currentPage: 1
            };
            api.tagQuery(params).then((res) => {
                this.tagOptions = res.data;
            });
        }
    }
};
</script>
