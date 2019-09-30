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
                v-if="form.publish"
                :disabled="isSaving"
                size="mini"
                round
                @click="handleCancelPublish">
                取消发布
            </el-button>
            <el-button
                :disabled="isSaving"
                size="mini"
                type="primary"
                round
                @click="handleOpenPublishModal">
                {{ isPublish }}
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
            :tag-id="tagId"
            :tag-options="tagOptions"
            @handlePublish="handlePublish">
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
        tagId() {
            return this.form.tagId ? this.form.tagId : '';
        },
        tips() {
            if (this.isSaving) {
                return '保存中...';
            } else {
                return this.saved ? '已保存' : '未发布的文章将自动保存到';
            }
        },
        isPublish() {
            return this.form.publish ? '已发布' : '发布';
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
        this.getArticleTag();
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
                    tagId: tagId && tagId._id ? tagId._id : ''
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
                    let path = `/write/${articleId}`;
                    this.handleRoutePush(path);
                }).catch(() => {
                    this.isSaving = false;
                });
            }
        },
        // 取消发布
        handleCancelPublish() {
            Object.assign(this.form, {
                publish: false
            });

            this.handleSave();
        },
        // 发布
        handlePublish(obj) {
            Object.assign(this.form, obj);
            this.handleSave();
        },
        handleRoutePush(path) {
            this.$router.push(path).catch(() => {});
        },
        getArticleTag() {
            api.tagChildQuery().then((res) => {
                this.tagOptions = res.data;
            });
        }
    }
};
</script>

<style lang="less">
    @import './layout.less';
</style>
