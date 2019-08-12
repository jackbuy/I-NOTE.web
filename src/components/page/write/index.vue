<template>
    <div class="write">
        <div class="write__header">
            <span v-if="!isPublish">
                <span v-if="articleId" class="label">已保存到</span>
                <span v-else-if="isSaving" class="label">保存中...</span>
                <span v-else class="label">文章将自动保存到</span>
                <el-button
                    @click="handleRouterDraft">草稿</el-button>
            </span>
            <span v-if="isPublish">
                <span v-if="isSaving" class="label">保存中...</span>
                <span v-else class="label">已保存</span>
            </span>
            <!-- <el-button
                @click="handleRouterDraft">发布</el-button> -->
            <el-popover
                placement="bottom"
                title="标题"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">发布</el-button>
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
                contentHtml: '',
                publish: false,
                tagId: ''
            },
            tagOptions: [],
            isSaving: false
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        },
        isPublish() {
            return this.form.publish;
        }
    },
    watch: {
        $route(to, from) {
            if (to.path === '/write') {
                this.form = {
                    title: '',
                    contentHtml: '',
                    publish: false,
                    tagId: ''
                };
            }
        },
        form: {
            handler(n, o) {
                this.handleSave();
                // if (!this.isSaving) {
                // }
            },
            deep: true
        }
    },
    created() {
        if (this.articleId) this.getDetail(this.articleId);
        // this.getArticleTag();
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
        getDetail(articleId) {
            api.getDetail({ articleId }).then((res) => {
                const { contentHtml, publish, tagId, title } = res.data;
                this.form = {
                    contentHtml,
                    publish,
                    title,
                    tagId
                };
            });
        },
        handleSave() {
            const params = {
                ...this.form
            };
            this.isSaving = true;
            if (this.articleId) {
                api.articleEdit(this.articleId, params).then(() => {
                    this.isSaving = false;
                });
            } else {
                api.articleAdd(params).then((res) => {
                    const { articleId } = res.data;
                    this.$router.push(`/write/${articleId}`);
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
        },
        handleRouterDraft() {
            this.$router.push('/article/draft');
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
