<template>
    <layout>
        <div slot="side">
            <card :padding="false" :title="articleTitle" class="mb0 fixed">
                <template slot="menu">
                    <div class="menu">
                        <span
                            v-if="articleId"
                            class="menu-btn round"
                            @click="handleRouterPush('/write')">
                            <i class="icon icon-jia"></i>
                            新建
                        </span>
                    </div>
                </template>
                <article-list
                    :loading="listLoading"
                    :data="listData"
                    :article-id="articleId"
                    @search="handleSearchList"
                    @del="handleDelete">
                </article-list>
            </card>
        </div>
        <div slot="content">
            <div v-show="!preView">
                <div
                    v-if="articleId"
                    class="write__header">
                    <span>
                        <span class="label">{{ tips }}</span>
                    </span>
                    <el-button
                        :disabled="isSaving"
                        size="mini"
                        round
                        icon="icon icon-yulan"
                        @click="handlePreView">
                        预览
                    </el-button>
                    <el-button
                        v-if="form.isPublish"
                        :disabled="isSaving"
                        size="mini"
                        round
                        @click="handleCancelPublish(form.articlePublishId, articleId)">
                        取消发布
                    </el-button>
                    <el-button
                        :disabled="isSaving"
                        :loading="tagLoading"
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
            </div>
            <div v-show="preView" class="pre-view">
                <card :padding="false" title="预览">
                    <div slot="menu" class="menu">
                        <div
                            class="menu-btn round"
                            @click="handlePreView()">
                            编辑
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail__title">
                            {{ form.title }}
                        </div>
                        <div
                            v-highlightB
                            v-html="form.contentHtml"
                            class="article-detail__content">
                        </div>
                    </div>
                </card>
            </div>
            <publish-modal
                v-if="showPublishModal"
                v-model="showPublishModal"
                :tag-id="publishTagId"
                :tag-options="tagOptions"
                @handlePublish="handlePublish">
            </publish-modal>
        </div>
    </layout>
</template>

<script>
import Layout from './Layout';
import PublishModal from './PublishModal';
import ArticleList from './ArticleList';
import WangEditor from '@/components/common/wangEditor';
import QuillEditor from '@/components/common/quillEditor';
import Card from '@/components/common/card';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Layout,
        QuillEditor,
        WangEditor,
        PublishModal,
        ArticleList,
        Card
    },
    mixins: [ message ],
    data() {
        return {
            showPublishModal: false,
            preView: false,
            form: {},
            tagOptions: [], // 标签列表
            tagLoading: false,
            publishTagId: '',
            isSaving: false,
            saved: false,
            timer: null,
            listData: [], // 文章列表
            listLoading: true,
            pageConfig: {
                pageSize: 100,
                currentPage: 1,
                total: 0
            }
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
        articleTotal() {
            return this.pageConfig.total || 0;
        },
        articleTitle() {
            return `我的文章 ( ${this.articleTotal} )`;
        }
    },
    watch: {
        form: {
            handler(n, o) {
                if (n && n.title && o && !this.isSaving) {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.handleSave();
                    }, 1000);
                }
            },
            deep: true
        },
        articleId: {
            handler(n, o) {
                if (n === o) return;
                this.form = {};
                if (n) this.getDetail(this.articleId);
            },
            immediate: true
        }
    },
    created() {
        this.getList();
    },
    mounted() {
        window.addEventListener('resize', this.setEditorHeight);
        this.setEditorHeight();
    },
    destroyed() {
        window.removeEventListener('resize', this.setEditorHeight);
    },
    methods: {
        // 预览
        handlePreView() {
            this.preView = !this.preView;
            if (!this.preView) {
                this.setEditorHeight();
            }
        },
        // 设置编辑器高度
        setEditorHeight() {
            const edit = document.getElementsByClassName('ql-container ql-snow')[0];
            const list = document.getElementsByClassName('write-list')[0];
            edit.style.height = window.innerHeight - 157 + 'px';
            list.style.height = window.innerHeight - 114 - 39 + 'px';
        },
        // 发布验证
        handleOpenPublishModal() {
            if (!this.form.title || this.form.title.length === 0) return this.showWarningMsg('标题不能为空！');
            if (!this.form.contentHtml || this.form.contentHtml.length === 0) return this.showWarningMsg('正文不能为空！');
            this.getArticleTag().then(() => {
                this.showPublishModal = true;
                this.publishTagId = this.form.tagId ? this.form.tagId : '';
            });
        },
        // 获取详情
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
        // 保存
        handleSave(obj = {}) {
            let params = {
                ...this.form,
                ...obj
            };
            this.isSaving = true;
            if (this.articleId) {
                api.articleEdit(this.articleId, params).then((res) => {
                    const item = {
                        _id: this.articleId,
                        title: this.form.title,
                        isPublish: this.form.isPublish
                    };
                    this.editArr(this.listData, this.getIndex(this.listData, this.articleId), item);

                    this.saved = true;
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            } else {
                api.articleAdd(params).then((res) => {
                    const { articleId } = res.data;

                    const item = {
                        _id: articleId,
                        title: this.form.title
                    };
                    this.addArr(this.listData, item);

                    this.pageConfig.total++;

                    const path = `/write/${articleId}`;
                    this.handleRouterPush(path);

                    this.saved = true;
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            }
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
        // 取消发布（已发布的文章）
        handleCancelPublish(articlePublishId, articleId) {
            api.articlePublishDelete(articlePublishId, articleId).then(() => {
                this.form.isPublish = false;
            });
        },
        // 标签列表
        getArticleTag() {
            return new Promise((resolve, reject) => {
                this.tagLoading = true;
                api.tagQuery().then((res) => {
                    this.tagOptions = res.data;
                    this.tagLoading = false;
                    resolve();
                }).catch(() => {
                    this.tagLoading = false;
                    reject(new Error('标签加载失败'));
                });
            });
        },
        // 文章搜索
        handleSearchList(keyword) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.getList(keyword);
        },
        // 文章列表
        getList(keyword) {
            const params = {
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (keyword) params.keyword = keyword;
            this.listLoading = true;
            api.articleQuery(params).then((res) => {
                this.pageConfig.total = res.total;
                this.listData = res.data;
                this.listLoading = false;
            }).catch(() => {
                this.listLoading = false;
            });
        },
        // 文章删除
        handleDelete(articleId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(articleId).then(() => {
                    const path = '/write';
                    this.preView = false;
                    this.pageConfig.total--;
                    this.delArr(this.listData, this.getIndex(this.listData, articleId));
                    this.showSuccessMsg('删除成功！');
                    this.handleRouterPush(path);
                });
            }).catch(() => {});
        },
        getIndex(arr, id) {
            let _index = -1;
            arr.map((item, index) => {
                if (item._id === id) {
                    _index = index;
                }
            });
            return _index;
        },
        getItem(arr, id) {
            let obj = {};
            arr.map((item) => {
                if (item._id === id) {
                    obj = item;
                }
            });
            return obj;
        },
        delArr(arr, index) {
            if (index > -1) return arr.splice(index, 1);
        },
        editArr(arr, index, item) {
            if (index > -1) return arr.splice(index, 1, item);
        },
        addArr(arr, item) {
            return arr.unshift(item);
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
