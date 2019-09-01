<template>
    <div class="write">
        <div class="write__header">
            <span>
                <span class="label">{{ tips }}</span>
            </span>
            <el-button
                :disabled="isSaving"
                size="mini"
                round
                @click="handleRoutePush('/article/draft')">
                草稿
            </el-button>
            <el-button
                :disabled="isSaving"
                size="mini"
                type="primary"
                round
                @click="handleOpenPublishModal">
                发布
            </el-button>
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
        <publish-modal
            v-if="showPublishModal"
            v-model="showPublishModal"
            :data="form"
            @handlePublish="handleSave">
        </publish-modal>
    </div>
</template>

<script>
import Editor from '@/components/common/editor';
import PublishModal from './publishModal';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Editor,
        PublishModal
    },
    mixins: [ message ],
    data() {
        return {
            showPublishModal: false,
            form: {},
            tagOptions: [],
            isSaving: false,
            saved: false,
            timer: null
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        },
        tips() {
            if (this.isSaving) {
                return '保存中...';
            } else {
                return this.saved ? '已保存' : '文章将自动保存到';
            }
        }
    },
    watch: {
        form: {
            handler(n, o) {
                if (o && !this.isSaving) {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.handleSave();
                    }, 1000);
                }
            },
            deep: true
        }
    },
    created() {
        if (this.articleId) this.getDetail(this.articleId);
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
        handleOpenPublishModal() {
            if (!this.form.title || this.form.title.length === 0) return this.showWarningMsg('标题不能为空！');
            if (!this.form.contentHtml || this.form.contentHtml.length === 0) return this.showWarningMsg('正文不能为空！');
            this.showPublishModal = true;
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
            }).catch(() => {});
        },
        handleSave(obj) {
            let params = obj || {};
            if (!obj) params = { ...this.form };
            this.isSaving = true;
            if (this.articleId) {
                api.articleEdit(this.articleId, params).then((res) => {
                    this.saved = true;
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            } else {
                api.articleAdd(params).then((res) => {
                    this.saved = true;
                    this.isSaving = false;
                    const { articleId } = res.data;
                    this.$router.push(`/write/${articleId}`);
                }).catch(() => {
                    this.isSaving = false;
                });
            }
        },
        handleRoutePush(path) {
            this.$router.push(path);
        }
    }
};
</script>

<style lang="less">
@import './layout.less';
</style>
