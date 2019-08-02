<template>
    <article-layout>
        <article-list
            :data="articleData"
            :load-more="isLoadMore"
            :no-more="isLoadFinish"
            slot="content">
            <article-list-item
                slot-scope="scope"
                :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        :disabled="scopeInner.row.userId._id === currentUserId || scopeInner.row.isSupport"
                        :class="{'active': scopeInner.row.isSupport}"
                        @click="handleSupport(scopeInner.row._id)">
                        <span v-if="scopeInner.row.isSupport">已赞</span>
                        <span v-else>点赞</span>
                    </button>
                    <button
                        :disabled="scopeInner.row.userId._id === currentUserId"
                        :class="{'active': scopeInner.row.isCollect}"
                        @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                        <i v-if="scopeInner.row.isCollect" class="el-icon-star-on"></i>
                        <i v-else class="el-icon-star-off"></i>
                    </button>
                    <button
                        @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                        <i class="el-icon-chat-dot-round"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterEdit(scopeInner.row._id)">
                        <i class="el-icon-edit"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterDelete(scopeInner.row._id)">
                        <i class="el-icon-delete"></i>
                    </button>
                </template>
            </article-list-item>
        </article-list>
        <card slot="tag" title="标签" v-model="articleTagData">
            <article-tag
                slot="content"
                v-for="item in articleTagData"
                :key="item._id"
                :item="item">
            </article-tag>
        </card>
        <card slot="specialTopic" title="专题" v-model="specialTopicData">
            <special-topic
                slot="content"
                v-for="item in specialTopicData"
                :key="item._id"
                :item="item">
            </special-topic>
        </card>
    </article-layout>
</template>

<script>
import ArticleLayout from './Layout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag';
import SpecialTopic from '@/components/common/specialTopic';
import Card from '@/components/common/card';
import scrollEvent from '@/mixins/scrollEvent';
import ArticleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';
import utils from '@/utils/utils';

export default {
    name: 'Home',
    components: {
        ArticleLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        SpecialTopic,
        Card
    },
    mixins: [ scrollEvent, ArticleCommon ],
    data() {
        return {
            specialTopicData: [
                {
                    _id: '33',
                    title: '自驾游',
                    img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1179289982,1144911896&fm=26&gp=0.jpg'
                },
                {
                    _id: '333',
                    title: '摄影',
                    img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144388917,3393541021&fm=26&gp=0.jpg'
                },
                {
                    _id: '444',
                    title: '背包客的故事',
                    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1404651180,2297079451&fm=26&gp=0.jpg'
                },
                {
                    _id: '4464',
                    title: 'keep-alive的深入理解与使用(配合router-view缓存整个路由页面)',
                    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1404651180,2297079451&fm=26&gp=0.jpg'
                }
            ], // 专题数据
            articleData: [],
            articleTagData: [],
            pageConfig: {
                pageSize: 5,
                currentPage: 1,
                total: 0
            },
            isLoadMore: false, // 是否加载中,
            isLoadFinish: false // 是否加载完成
        };
    },
    computed: {
        tagName() {
            return this.$route.params.tagName;
        }
    },
    watch: {
        tagName: {
            handler(n, o) {
                this.pageConfig.currentPage = 1;
                this.articleData = [];
                this.isLoadFinish = false;
                this.getArticleList(n, 'load');
            },
            immediate: true
        }
    },
    created() {
        this.getArticleTag();
    },
    methods: {
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList(this.tagName);
        },
        handleCollect(articleId, type) {
            api.articleCollect(articleId).then(() => {
                this.articleData.map((item) => {
                    if (item._id === articleId) {
                        if (!type) {
                            item.isCollect = true;
                            item.collectCount++;
                        } else {
                            item.isCollect = false;
                            item.collectCount--;
                        }
                    }
                });
            });
        },
        handleSupport(articleId) {
            api.articleSupport(articleId).then(() => {
                this.articleData.map((item) => {
                    if (item._id === articleId) {
                        item.isSupport = true;
                        item.supportCount++;
                    }
                });
            });
        },
        handleRouterDelete(articleId) {
            this.confirmDelete().then(() => {
                return api.articleDelete(articleId);
            }).then(() => {
                const index = utils.findIdIndex(this.articleData, articleId);
                this.articleData.splice(index, 1);
                this.showSuccessMsg('删除成功！');
            }).catch(() => {});
        },
        getArticleList(tagName, loadType = 'loadMore') {
            const params = {
                publish: true,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (tagName && tagName !== 'all') params.tagName = tagName;
            this.isLoadMore = true;
            api.articleQuery(params).then((res) => {
                this.pageConfig.total = res.total;
                this.isLoadMore = false;
                if (loadType === 'loadMore') {
                    this.articleData.push(...res.data);
                } else {
                    this.articleData = res.data;
                }
                if (this.articleData.length === res.total) this.isLoadFinish = true;
            });
        },
        getArticleTag() {
            api.tagQuery().then((res) => {
                if (res.data.length > 0) {
                    this.articleTagData.push({
                        name: 'all',
                        title: '全部'
                    });
                    this.articleTagData.push(...res.data);
                }
            });
        }
    }
};
</script>
