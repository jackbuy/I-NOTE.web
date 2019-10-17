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
                icon="icon icon-caogao"
                @click="handleRoutePush('/article/draft')">
                我的草稿
            </el-button>
            <el-button
                :disabled="isSaving"
                size="mini"
                type="primary"
                round
                icon="icon icon-fabu"
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
        <quill-editor
            v-model="form.contentHtml"
            placeholder="输入正文...">
        </quill-editor>
        <!-- <wang-editor
            v-model="form.contentHtml"
            :menus="editorMenus">
        </wang-editor> -->
        <publish-modal
            v-if="showPublishModal"
            v-model="showPublishModal"
            :tag-id="publishTagId"
            :tag-options="tagOptions"
            @handlePublish="handlePublish">
        </publish-modal>
    </div>
</template>

<script>
import WangEditor from '@/components/common/wangEditor';
import QuillEditor from '@/components/common/quillEditor';
import PublishModal from './publishModal';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        QuillEditor,
        WangEditor,
        PublishModal
    },
    mixins: [ message ],
    data() {
        return {
            showPublishModal: false,
            form: {},
            tagOptions: [],
            editorMenus: [
                'bold',
                'italic',
                'strikeThrough',
                'link',
                'image',
                'video',
                'quote',
                'code'
            ],
            publishTagId: '',
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
                return this.saved ? '已保存' : '';
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
            // quillEditor
            let edit = document.getElementsByClassName('ql-container ql-snow')[0];
            edit.style.height = window.innerHeight - 158 + 'px';

            // wangEditor
            // let edit = document.getElementsByClassName('text')[0];
            // edit.style.height = window.innerHeight - 155 - 12 + 'px';
            // edit.style.height = window.innerHeight - 192 - 12 + 'px';
        },
        handleOpenPublishModal() {
            if (!this.form.title || this.form.title.length === 0) return this.showWarningMsg('标题不能为空！');
            if (!this.form.contentHtml || this.form.contentHtml.length === 0) return this.showWarningMsg('正文不能为空！');
            this.showPublishModal = true;
            this.publishTagId = this.form.tagId ? this.form.tagId : '';
        },
        getDetail(articleId) {
            api.articleDetail(articleId).then((res) => {
                const { contentHtml, tagId, isPublish, title, articlePublishId } = res.data;
                this.form = {
                    title,
                    contentHtml,
                    isPublish,
                    articlePublishId
                };
                if (tagId && tagId._id) this.form.tagId = tagId._id;
            }).catch(() => {});
        },
        handleSave(obj = {}) {
            let params = {
                ...this.form,
                ...obj
            };
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
            // Object.assign(this.form, {
            //     publish: false
            // });

            // this.handleSave();
        },
        // 发布
        handlePublish(obj) {
            Object.assign(this.form, obj);
            if (this.form.isPublish && this.form.articlePublishId) {
                api.articlePublishUpdate(this.form.articlePublishId, {
                    ...this.form,
                    articleId: this.articleId
                }).then(() => {
                    this.handleSave({
                        isPublish: true
                    });
                });
            } else {
                api.articlePublish({
                    ...this.form,
                    articleId: this.articleId
                }).then((res) => {
                    const { articlePublishId } = res.data;
                    this.handleSave({
                        articlePublishId,
                        isPublish: true
                    });
                });
            }
        },
        handleRoutePush(path) {
            this.$router.push(path).catch(() => {});
        },
        getArticleTag() {
            api.tagQuery().then((res) => {
                this.tagOptions = res.data;
            });
        }
    }
};
</script>
