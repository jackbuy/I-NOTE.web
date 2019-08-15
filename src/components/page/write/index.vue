<template>
    <div class="write">
        <div class="write__header">
            <span>
                <span class="label">{{ tips }}</span>
            </span>
            <el-popover
                placement="bottom"
                width="210"
                v-model="visible">
                <div>
                    <div>
                        <span class="publish-title">是否发布：</span>
                        <el-switch
                            v-model="form.publish"
                            inactive-icon-class="inactive"
                            active-color="#13ce66"
                            inactive-color="#ccc">
                        </el-switch>
                    </div>
                    <el-select
                        v-if="form.publish"
                        v-model="form.tagId"
                        :popper-append-to-body="false"
                        class="mt15"
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
                        :disabled="!isEditor"
                        class="mt15"
                        size="mini"
                        type="primary"
                        @click="handlePublish">确定</el-button>
                </div>
                <el-button
                    size="mini"
                    slot="reference">
                    {{ editorStatus }} 保存<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            </el-popover>
        </div>
        <div class="write__title">
            <input
                v-model="form.title"
                type="text"
                placeholder="输入标题...">
        </div>
        <editor
            placeholder="输入正文..."
            v-model="form.contentHtml"></editor>
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
                contentHtml: '',
                publish: false,
                tagId: ''
            },
            tagOptions: [],
            isSaving: false,
            isEditor: false,
            isLoadDetail: false, // 详情内容是否加载完
            visible: false
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        },
        isPublish() {
            return this.form.publish;
        },
        tips() {
            if (this.isSaving) {
                return '保存中...';
            } else {
                return '未发布的文章，将保存到 “草稿箱”';
            }
        },
        editorStatus() {
            if (this.isEditor) return '*';
        }
    },
    watch: {
        form: {
            handler(n, o) {
                if (o) this.isEditor = true;
            },
            deep: true
        }
    },
    created() {
        if (this.articleId) this.getDetail(this.articleId);
        this.getArticleTag();
    },
    mounted() {
        window.addEventListener('resize', this.setEditorHeight);
        this.setEditorHeight();
    },
    destroyed() {
        window.removeEventListener('resize', this.setEditorHeight);
    },
    methods: {
        // 设置编辑器高度
        setEditorHeight() {
            let edit = document.getElementsByClassName('ql-container ql-snow')[0];
            edit.style.height = window.innerHeight - 202 - 12 + 'px';
        },
        handlePublish() {
            if (this.form.title.length === 0) return this.showWarningMsg('请输入标题');
            if (this.form.publish && !this.form.tagId) return this.showWarningMsg('请选择标签');
            this.handleSave();
        },
        getDetail(articleId) {
            api.getDetail({ articleId, isEdit: true }).then((res) => {
                const { contentHtml, publish, tagId, title } = res.data;
                this.form = {
                    contentHtml,
                    publish,
                    title,
                    tagId
                };
            }).then(() => {
                this.isLoadDetail = true;
            });
        },
        handleSave() {
            const params = {
                ...this.form
            };
            this.isSaving = true;
            if (this.articleId) {
                api.articleEdit(this.articleId, params).then((res) => {
                    this.isEditor = false;
                    this.visible = false;
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            } else {
                api.articleAdd(params).then((res) => {
                    this.isEditor = false; // 关闭提示
                    const { articleId } = res.data;
                    this.$router.push(`/write/${articleId}`);
                    this.visible = false;
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            }
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

<style lang="less">
@import './index.less';
</style>
