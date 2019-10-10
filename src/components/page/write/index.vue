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
            <!-- <el-button
                :disabled="isSaving"
                size="mini"
                type="primary"
                round
                @click="handleSave">
                保存
            </el-button> -->
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
            // quillEditor
            let edit = document.getElementsByClassName('ql-container ql-snow')[0];
            edit.style.height = window.innerHeight - 158 - 12 + 'px';

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
            api.getDetail({ articleId, isEdit: true }).then((res) => {
                const { contentHtml, publish, tagId, title } = res.data;
                this.form = {
                    contentHtml,
                    publish,
                    title
                };
                if (tagId && tagId._id) this.form.tagId = tagId._id;
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
            api.tagQuery().then((res) => {
                this.tagOptions = res.data;
            });
        }
    }
};
</script>
