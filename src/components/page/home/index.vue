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
        <card slot="tag" icon="icon icon-bq" title="标签" v-model="articleTagData">
            <div slot="menu" class="menu">
                <span @click="handleRouterTag">全部</span>
            </div>
            <article-tag
                slot="content"
                v-for="item in articleTagData"
                :key="item._id"
                :item="item">
            </article-tag>
        </card>
        <!-- <card slot="specialTopic" title="专题" v-model="specialTopicData">
            <div slot="menu" class="menu">
                <span>全部</span>
            </div>
            <special-topic
                slot="content"
                v-for="item in specialTopicData"
                :key="item._id"
                :item="item">
            </special-topic>
        </card> -->
    </home-layout>
</template>

<script>
import HomeLayout from './HomeLayout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag';
import SpecialTopic from '@/components/common/specialTopic';
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
        Card,
        ArticleSort
    },
    mixins: [ articleListCommon ],
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
        this.getArticleTag();
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
        getArticleTag() {
            if (!this.currentUserId) {
                api.tagQuery().then((res) => {
                    this.articleTagData = res.data;
                });
            } else {
                api.tagFollowQuery().then((res) => {
                    this.articleTagData = res.data;
                });
            }
        },
        handleRouterTag() {
            this.$router.push('/tag');
        }
    }
};
</script>
