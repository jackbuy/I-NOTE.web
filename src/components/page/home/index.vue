<template>
    <home-layout>
        <article-sort slot="header">
            <span :class="{'active': sortType === 'newest'}" @click="handleSort('newest')">最新</span>
            <span :class="{'active': sortType === 'popular'}" @click="handleSort('popular')">热门</span>
        </article-sort>
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
                        :disabled="scopeInner.row.userId._id === currentUserId"
                        :class="{'active': scopeInner.row.isSupport}"
                        @click="handleSupport(scopeInner.row._id, scopeInner.row.isSupport)">
                        <i v-if="scopeInner.row.isSupport" class="icon icon-dianzan"></i>
                        <i v-else class="icon icon-dianzan-o"></i>
                        {{ scopeInner.row.supportCount > 0 ? scopeInner.row.supportCount : '' }}
                    </button>
                    <button
                        :disabled="scopeInner.row.userId._id === currentUserId"
                        :class="{'active': scopeInner.row.isCollect}"
                        @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                        <i v-if="scopeInner.row.isCollect" class="icon icon-like"></i>
                        <i v-else class="icon icon-like-o"></i>
                        {{ scopeInner.row.collectCount > 0 ? scopeInner.row.collectCount : '' }}
                    </button>
                </template>
            </article-list-item>
        </article-list>
        <card slot="tag" icon="icon icon-bq" title="热门标签">
            <div slot="menu" class="menu">
                <span @click="handleRouterPush('/tag')">全部</span>
            </div>
            <article-tag
                slot="content"
                v-for="item in tagRecommendData"
                :key="item._id"
                :item="item">
            </article-tag>
        </card>
        <card slot="topic" icon="icon icon-bq" title="专题榜">
            <div slot="menu" class="menu">
                <span @click="handleRouterPush('/topic')">全部</span>
            </div>
            <special-topic
                slot="content"
                v-for="item in topicRecommendData"
                :key="item._id"
                :item="item">
            </special-topic>
        </card>
        <card slot="author" icon="icon icon-bq" title="创作榜">
            <author-hot
                slot="content"
                v-for="item in authorRecommendData"
                :key="item._id"
                :item="item">
            </author-hot>
        </card>
    </home-layout>
</template>

<script>
import HomeLayout from './HomeLayout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag';
import SpecialTopic from '@/components/common/specialTopic';
import authorHot from '@/components/common/authorHot';
import Card from '@/components/common/card';
import ArticleSort from '@/components/common/articleSort';
import articleListCommon from '@/mixins/articleListCommon';
import api from '@/utils/api';

export default {
    name: 'Home',
    components: {
        HomeLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        SpecialTopic,
        authorHot,
        Card,
        ArticleSort
    },
    mixins: [ articleListCommon ],
    data() {
        return {
            articleData: [],
            tagRecommendData: [], // Tag推荐
            authorRecommendData: [], // 作者推荐
            topicRecommendData: [], // 专题推荐
            pageConfig: {
                pageSize: 15,
                currentPage: 1,
                total: 0
            },
            isLoadMore: false, // 是否加载中,
            isLoadFinish: false // 是否加载完成
        };
    },
    computed: {
        sortType() {
            return this.$route.params.sortType;
        }
    },
    watch: {
        sortType: {
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
        this.getTagRecommend();
        this.getUserRecommend();
        this.getTopicRecommend();
    },
    methods: {
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList(this.sortType);
        },
        getArticleList(sortType, loadType = 'loadMore') {
            const params = {
                publish: true,
                sortType,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
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
        handleSort(sortType) {
            this.$router.push(`/find/${sortType}`);
        },
        getTagRecommend() {
            api.tagRecommend().then((res) => {
                this.tagRecommendData = res.data;
            });
        },
        getUserRecommend() {
            api.userRecommend().then((res) => {
                this.authorRecommendData = res.data;
            });
        },
        getTopicRecommend() {
            api.topicRecommend().then((res) => {
                this.topicRecommendData = res.data;
            });
        },
        handleRouterPush(path) {
            this.$router.push(path);
        }
    }
};
</script>
