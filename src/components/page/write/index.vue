<template>
    <layout :pre-view="preView" :is-has="isHas">
        <div slot="side" class="fixed">
            <card :padding="false" v-loading="isSaving">
                <div slot="title" class="tit-menu">
                    <span v-if="cateTitle" @click="handleCate">
                        {{ `${cateTitle} (${articleTotal})` }}
                        <i class="icon" :class="{'icon-jiantou-down': !showCateList, 'icon-jiantou-up': showCateList}"></i>
                    </span>
                </div>
                <div slot="menu" class="menu">
                    <el-button
                        v-if="showCateList"
                        :loading="createLoading"
                        :disabled="isSaving"
                        type="primary"
                        size="mini"
                        round
                        icon="icon icon-wenjianjia-add"
                        title="新建分组"
                        @click="handleCateModalOpenAdd">
                    </el-button>
                    <el-button
                        v-else
                        :loading="createLoading"
                        :disabled="isSaving"
                        type="primary"
                        size="mini"
                        round
                        icon="icon icon-wenzhang-add"
                        title="添加文章"
                        @click="handleAdd">
                    </el-button>
                </div>
                <cate-list
                    v-show="showCateList"
                    :cate-id="cateActive._id"
                    :data="cateList"
                    @change="handleCateChange"
                    @edit="handleCateModalOpenEdit"
                    @del="handleCateDel">
                </cate-list>
                <article-list
                    ref="articleList"
                    v-show="!showCateList"
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
                    @cancelPublish="handleCancelPublish"
                    @addTopic="handleAddTopic">
                </article-list>
                <topic-article-add
                    v-model="topicArticleAddModalVisible"
                    :data="topicList"
                    @createTopic="handleCreateTopic"
                    @addToTopic="handleAddToTopic">
                </topic-article-add>
                <cate-modal
                    v-if="showCateModal"
                    v-model="showCateModal"
                    :modal-type="cateModalType"
                    :title="cateModalTitle"
                    @save="handleCateSave"></cate-modal>
                <cate-change-modal
                    v-if="showCateChangeModal"
                    v-model="showCateChangeModal"
                    :data="cateList"
                    :cateId="cateChangeModalCateId"
                    @change="handleChangeCate"></cate-change-modal>
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
                        <span v-if="tips">
                            <span class="label">{{ tips }}</span>
                        </span>
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
                        <el-dropdown
                            trigger="click"
                            @command="handleCommand">
                            <div class="more" title="更多"><i class="icon icon-more"></i></div>
                            <el-dropdown-menu class="write-dropdown-menu">
                                <el-dropdown-item
                                    command="preview"
                                    icon="icon icon-chakan">预览</el-dropdown-item>
                                <el-dropdown-item
                                    v-if="form.isPublish"
                                    command="cancelPublish"
                                    divided
                                    icon="icon icon-quxiaofabu">取消发布</el-dropdown-item>
                                <el-dropdown-item
                                    command="changeCateOpen"
                                    divided
                                    icon="icon icon-genggai">更改分组</el-dropdown-item>
                                <el-dropdown-item
                                    :disabled="!form.isPublish"
                                    command="addTopic"
                                    divided
                                    icon="icon icon-jia">加入专题</el-dropdown-item>
                                <el-dropdown-item
                                    :disabled="form.isPublish"
                                    command="del"
                                    divided
                                    icon="el-icon-delete">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <quill-editor
                    v-model="form.contentHtml"
                    :token="token"
                    :article-id="articleId"
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
            :title="`预览 - ${form.title}`">
            <div slot="menu" class="menu">
                <div
                    class="menu-btn round"
                    @click="handleFullScreen()">
                    <i class="icon" :class="{'icon-quanping-on': !fullscreen, 'icon-quanping-off': fullscreen}"></i>
                    全屏
                </div>
                <div
                    class="menu-btn round"
                    @click="handlePreView()">
                    <i class="icon icon-back"></i>
                    编辑
                </div>
            </div>
            <article-content
                :title="form.title"
                :content="form.contentHtml"
                :show-title="false"
                :show-info="false">
            </article-content>
        </card>
    </layout>
</template>

<script>
import { mapState } from 'vuex';
import Layout from './Layout';
import PublishModal from './PublishModal';
import ArticleList from './ArticleList';
import CateList from './CateList';
import CateModal from './CateModal';
import CateChangeModal from './CateChangeModal';
import QuillEditor from '@/components/common/quillEditor';
import TopicArticleAdd from '@/components/common/topicArticleAdd';
import Card from '@/components/common/card';
import articleContent from '@/components/common/articleContent';
import message from '@/mixins/message';
import fullScreen from '@/mixins/fullScreen';
import topicArticleAdd from '@/mixins/topicArticleAdd';
import api from '@/utils/api';
export default {
    name: 'ArticleAdd',
    components: {
        Layout,
        TopicArticleAdd,
        QuillEditor,
        PublishModal,
        ArticleList,
        CateList,
        CateModal,
        CateChangeModal,
        articleContent,
        Card
    },
    mixins: [ message, topicArticleAdd, fullScreen ],
    data() {
        return {
            activeTabName: 'all',
            showCateList: false,
            showCateModal: false,
            showCateChangeModal: false,
            cateChangeModalCateId: '',
            cateList: [],
            cateListDefault: [
                {
                    _id: 'all',
                    type: 'default',
                    title: '全部'
                },
                {
                    _id: 'no-cate',
                    type: 'default',
                    title: '未分组'
                }
            ], // 分组列表
            cateActive: {},
            cateModalType: '',
            cateModalTitle: '',
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
        ...mapState({
            token: state => state.token
        }),
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
        cateTitle() {
            return this.cateActive.title;
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
        this.getCateList();
    },
    mounted() {
        this.setEditorHeight();
        window.addEventListener('resize', this.setEditorHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.setEditorHeight);
    },
    methods: {
        handleToggleScreen() {
            this.fullScreen = !this.fullScreen;
        },
        // 分组列表
        getCateList() {
            api.articleCateQuery().then((res) => {
                let arr = [];
                arr.push(
                    ...this.cateListDefault,
                    ...res.data
                );
                this.cateList = arr;
                this.cateActive = this.cateList[0];
                this.getList();
            });
        },
        handleCateModalOpenAdd() {
            this.cateModalType = 'add';
            this.showCateModal = true;
            this.cateModalTitle = '';
        },
        handleCateModalOpenEdit(obj) {
            const { title } = obj;
            this.cateModalType = 'edit';
            this.showCateModal = true;
            this.cateModalTitle = title;
        },
        // 分组保存（新增编辑）
        handleCateSave(obj) {
            const { title, type } = obj;
            const params = { title };
            if (type === 'add') {
                api.articleCateAdd(params).then((res) => {
                    this.getCateList();
                });
            }
            if (type === 'edit') {
                const { _id } = this.cateActive;
                api.articleCateEdit(params, _id).then((res) => {
                    this.getCateList();
                });
            }
        },
        // 分组删除
        handleCateDel() {},
        // 分组切换
        handleCateChange(cate) {
            this.handleCate();
            this.cateActive = cate;
            this.resetTab();
            this.getList();
        },
        // 分组展开/收起
        handleCate() {
            this.showCateList = !this.showCateList;
        },
        handleChangeCateOpen() {
            this.showCateChangeModal = true;
            this.cateChangeModalCateId = this.form.articleCateId;
        },
        // 分组更改
        handleChangeCate(cateId) {
            const params = {
                articleCateId: cateId
            };
            api.articleEdit(this.articleId, params).then(() => {
                this.form.articleCateId = cateId;
                this.getList();
                this.showSuccessMsg('更改分组成功！');
            });
        },
        handleCommand(command) {
            if (command === 'preview') {
                this.handlePreView();
            }
            if (command === 'cancelPublish') {
                this.handleCancelPublish(this.articleId);
            }
            if (command === 'addTopic') {
                this.handleAddTopic(this.form.articlePublishId);
            }
            if (command === 'changeCateOpen') {
                this.handleChangeCateOpen();
            }
            if (command === 'del') {
                this.handleDelete(this.articleId);
            }
        },
        handleTab(tabName) {
            this.activeTabName = tabName;
            this.getList();
        },
        // 文章列表
        getList() {
            const { _id } = this.cateActive;
            const params = {
                articleCateId: _id,
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
                    this.handleRouterReplace(`/write/${this.articleId}`);
                } else if (res.data && res.data.length > 0) {
                    this.handleRouterReplace(`/write/${res.data[0]._id}`);
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
                const { contentHtml, tagId, isPublish, title, articlePublishId, articleCateId } = res.data;
                this.form = {
                    title,
                    contentHtml,
                    isPublish,
                    articlePublishId,
                    articleCateId
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
        // 重置tab
        resetTab() {
            this.$refs.articleList.$refs.tab.tabClick('all');
        },
        // 新建
        handleAdd() {
            const { _id, type } = this.cateActive;
            const params = {
                title: '未命名文章'
            };
            if (type !== 'default') params.articleCateId = _id;
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
                this.resetTab();
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
                        this.handleRouterReplace(`/write/${this.listData[index > 0 ? index - 1 : 0]._id}`);
                    } else {
                        this.handleRouterReplace('/write');
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
                    if (res.data && res.data.length > 0) {
                        res.data.map((item) => {
                            item.children.map((_item) => {
                                delete _item.children;
                            });
                        });
                        this.tagOptions = res.data;
                    }
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
                this.handleFullScreen();
            }
        },
        // 设置编辑器高度
        setEditorHeight() {
            const edit = document.getElementsByClassName('ql-container ql-snow')[0];
            const empty = document.getElementsByClassName('article-empty')[0];
            const article = document.getElementsByClassName('write-list')[0];
            const cate = document.getElementsByClassName('cate-list')[0];
            edit.style.height = window.innerHeight - 153 - 15 + 'px';
            empty.style.height = window.innerHeight - 65 - 15 + 'px';
            article.style.height = window.innerHeight - 109 - 39 - 38 - 15 + 'px';
            cate.style.height = window.innerHeight - 110 - 15 + 'px';
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
        handleRouterReplace(path) {
            this.$router.replace(path).catch(() => {});
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
