<template>
    <layout :pre-view="preView" :is-has="isHas">
        <div slot="side">
            <card :padding="false" :title="articleTitle" class="fixed">
                <div slot="menu" class="menu">
                    <el-button
                        :loading="createLoading"
                        :disabled="isSaving"
                        type="primary"
                        size="mini"
                        round
                        icon="icon icon-jia"
                        title="添加文章"
                        @click="handleAdd">
                    </el-button>
                </div>
                <article-list
                    v-loading="isSaving"
                    :loading="listLoading"
                    :data="listData"
                    :article-id="articleId"
                    :active-tab-name="activeTabName"
                    @tab="handleTab"
                    @search="handleSearchList"
                    @del="handleDelete"
                    @preview="handlePreView"
                    @change="handleChange"
                    @publish="handleOpenPublishModal"
                    @cancelPublish="handleCancelPublish">
                </article-list>
            </card>
        </div>
        <div slot="content">
            <!-- 编辑 -->
            <card
                v-show="articleTotal > 0"
                v-loading="isSaving"
                :padding="false"
                :visible-header="true"
                class="mb0">
                <div
                    v-if="articleId"
                    class="write__header">
                    <div class="write__header-input">
                        <input
                            v-model="form.title"
                            type="text"
                            placeholder="输入标题...">
                    </div>
                    <div class="write__header-menu">
                        <span>
                            <span class="label">{{ tips }}</span>
                        </span>
                        <!-- <el-button
                            :disabled="isSaving"
                            size="mini"
                            round
                            icon="icon icon-chakan"
                            title="预览"
                            @click="handlePreView">
                        </el-button> -->
                        <!-- <el-button
                            v-if="form.isPublish"
                            :disabled="isSaving || tagLoading"
                            size="mini"
                            round
                            icon="icon icon-quxiaofabu"
                            title="取消发布"
                            @click="handleCancelPublish(form.articlePublishId, articleId)">
                        </el-button> -->
                        <el-button
                            :disabled="isSaving"
                            :loading="tagLoading"
                            size="mini"
                            type="primary"
                            round
                            icon="icon icon-fabu"
                            title="发布/更新发布"
                            @click="handleOpenPublishModal">
                        </el-button>
                    </div>
                </div>
                <quill-editor
                    v-model="form.contentHtml"
                    placeholder="输入正文...">
                </quill-editor>
                <publish-modal
                    v-if="showPublishModal"
                    v-model="showPublishModal"
                    :tag-id="publishTagId"
                    :tag-options="tagOptions"
                    @handlePublish="handlePublish">
                </publish-modal>
            </card>
            <card
                v-show="articleTotal === 0"
                :padding="false"
                :visible-header="true"
                class="mb0 article-empty">
                <div>
                    <div class="i"><i class="icon icon-wenzhang"></i></div>
                    <div class="tit">我的文章，空空如也~</div>
                    <div>
                        <el-button
                            :loading="createLoading"
                            :disabled="isSaving"
                            size="mini"
                            icon="icon icon-jia"
                            @click="handleAdd">
                            添加
                        </el-button>
                    </div>
                </div>
            </card>
        </div>
        <!-- 预览 -->
        <card
        slot="preView"
        :padding="false"
        title="预览">
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
    </layout>
</template>

<script>
import Layout from './Layout';
import PublishModal from './PublishModal';
import ArticleList from './ArticleList';
import QuillEditor from '@/components/common/quillEditor';
import Card from '@/components/common/card';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Layout,
        QuillEditor,
        PublishModal,
        ArticleList,
        Card
    },
    mixins: [ message ],
    data() {
        return {
            activeTabName: 'all',
            keyword: '',
            showPublishModal: false,
            preView: false,
            form: {},
            tagOptions: [], // 标签列表
            tagLoading: false,
            createLoading: false,
            publishLoading: false,
            publishTagId: '',
            isSaving: false,
            isHas: true,
            saved: false,
            timer: null,
            listData: [], // 文章列表
            listLoading: false,
            changeCount: 0, // 监听文章改变的数量，解决页面刷新，读取详情数据，会多发一次请求的问题
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
                return '加载中...';
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
                    this.changeCount++;
                    if (this.changeCount > 1) {
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.handleSave();
                        }, 500);
                    }
                }
            },
            deep: true
        },
        articleId: {
            handler(n, o) {
                if (n === o) return;
                this.form = {};
                if (n) {
                    this.getDetail(this.articleId);
                }
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
        handleTab(tabName) {
            this.activeTabName = tabName;
            this.getList();
        },
        // 文章列表
        getList() {
            const params = {
                type: this.activeTabName,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (this.keyword) params.keyword = this.keyword;
            this.listLoading = true;
            api.articleQuery(params).then((res) => {
                if (!this.keyword && this.activeTabName === 'all') this.pageConfig.total = res.total;
                this.listData = res.data;
                if (this.articleId) {
                    this.handleRouterPush(`/write/${this.articleId}`);
                } else if (res.data && res.data.length > 0) {
                    this.handleRouterPush(`/write/${res.data[0]._id}`);
                }
                this.listLoading = false;
            }).catch(() => {
                this.listLoading = false;
            });
        },
        // 切换列表
        handleChange(articleId) {
            this.handleRouterPush(`/write/${articleId}`);
        },
        // 获取详情
        getDetail(articleId) {
            this.isSaving = true;
            this.changeCount = 0;
            api.articleDetail(articleId).then((res) => {
                const { contentHtml, tagId, isPublish, title, articlePublishId } = res.data;
                this.form = {
                    title,
                    contentHtml,
                    isPublish,
                    articlePublishId
                };
                if (tagId && tagId._id) this.form.tagId = tagId._id;
                this.isHas = true;
                this.saved = false;
                this.isSaving = false;
            }).catch(() => {
                this.isHas = false;
                this.isSaving = false;
            });
        },
        // 新建
        handleAdd() {
            const params = {
                title: '未命名'
            };
            this.isSaving = true;
            this.createLoading = true;
            api.articleAdd(params).then((res) => {
                const { articleId } = res.data;
                const item = {
                    _id: articleId,
                    title: params.title
                };
                this.changeCount = 0;
                this.pageConfig.total++;
                this.addArr(this.listData, item);
                this.handleRouterPush(`/write/${articleId}`);
                this.isSaving = false;
                this.createLoading = false;
            }).catch(() => {
                this.isSaving = false;
                this.createLoading = false;
            });
        },
        // 编辑保存
        handleSave(obj = {}) {
            let params = {
                ...this.form,
                ...obj
            };
            this.isSaving = true;
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
        },
        // 文章删除
        handleDelete(articleId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                this.isSaving = true;
                api.articleDelete(articleId).then(() => {
                    this.changeCount = 0;
                    this.preView = false;
                    this.pageConfig.total--;
                    const index = this.getIndex(this.listData, articleId);
                    this.delArr(this.listData, index);
                    if (this.listData && this.listData.length > 0) {
                        this.handleRouterPush(`/write/${this.listData[index > 0 ? index - 1 : 0]._id}`);
                    } else {
                        this.handleRouterPush('/write');
                    }
                    this.showSuccessMsg('删除成功！');
                    this.isSaving = false;
                }).catch(() => {
                    this.isSaving = false;
                });
            }).catch(() => {});
        },
        // 发布验证、获取标签列表
        handleOpenPublishModal() {
            if (!this.form.title || this.form.title.length === 0) return this.showWarningMsg('标题不能为空！');
            if (!this.form.contentHtml || this.form.contentHtml.length === 0) return this.showWarningMsg('正文不能为空！');
            this.getArticleTag().then(() => {
                this.showPublishModal = true;
                this.publishTagId = this.form.tagId ? this.form.tagId : '';
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
        // 发布
        handlePublish(obj) {
            Object.assign(this.form, obj);
            if (this.form.isPublish && this.form.articlePublishId) {
                // 更新发布
                this.isSaving = true;
                api.articlePublishUpdate(this.form.articlePublishId, {
                    ...this.form,
                    articleId: this.articleId
                }).then(() => {
                    this.isSaving = false;
                    this.form.isPublish = true;
                    this.showSuccessMsg('更新发布成功！');
                    this.handleSave({ isPublish: true });
                }).catch(() => {
                    this.isSaving = false;
                });
            } else {
                // 发布
                this.isSaving = true;
                api.articlePublish({
                    ...this.form,
                    articleId: this.articleId
                }).then((res) => {
                    const { articlePublishId } = res.data;
                    this.isSaving = false;
                    this.form.isPublish = true;
                    this.form.articlePublishId = articlePublishId;
                    this.showSuccessMsg('发布成功！');
                    this.handleSave({ isPublish: true });
                }).catch(() => {
                    this.isSaving = false;
                });
            }
        },
        // 取消发布
        handleCancelPublish(articleId) {
            this.isSaving = true;
            api.articlePublishDelete(this.form.articlePublishId, articleId).then(() => {
                this.form.isPublish = false;
                this.showSuccessMsg('取消发布成功！');
                this.isSaving = false;
            }).catch(() => {
                this.isSaving = false;
            });
        },
        // 文章搜索
        handleSearchList(keyword) {
            this.keyword = keyword;
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.getList();
        },
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
            const empty = document.getElementsByClassName('article-empty')[0];
            const list = document.getElementsByClassName('write-list')[0];
            edit.style.height = window.innerHeight - 157 - 15 + 'px';
            empty.style.height = window.innerHeight - 69 - 15 + 'px';
            list.style.height = window.innerHeight - 114 - 39 - 15 - 37 + 'px';
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
