<template>
    <home-layout>
        <article-sort slot="header">
            <span :class="{'active': sortType === 'newest'}" @click="handleSort('newest')">最新</span>
            <span :class="{'active': sortType === 'popular'}" @click="handleSort('popular')">热门</span>
        </article-sort>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList(sortType)">
            <article-item
                slot-scope="scope"
                :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        :disabled="loading || scopeInner.row.userId._id === currentUserId"
                        :class="{'active': scopeInner.row.isSupport}"
                        @click="handleSupport(scopeInner.row._id, scopeInner.row.isSupport)">
                        <i v-if="scopeInner.row.isSupport" class="icon icon-dianzan"></i>
                        <i v-else class="icon icon-dianzan-o"></i>
                        {{ scopeInner.row.supportCount > 0 ? scopeInner.row.supportCount : '' }}
                    </button>
                    <button
                        :disabled="loading || scopeInner.row.userId._id === currentUserId"
                        :class="{'active': scopeInner.row.isCollect}"
                        @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                        <i v-if="scopeInner.row.isCollect" class="icon icon-like"></i>
                        <i v-else class="icon icon-like-o"></i>
                        {{ scopeInner.row.collectCount > 0 ? scopeInner.row.collectCount : '' }}
                    </button>
                </template>
            </article-item>
        </infinite-scroll>
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
        <card slot="topic" icon="icon icon-zhuanti" title="专题榜">
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
        <card slot="author" icon="icon icon-zuozhe" title="创作榜">
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
import HomeLayout from './Layout';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import ArticleTag from '@/components/common/articleTag';
import SpecialTopic from '@/components/common/specialTopic';
import authorHot from '@/components/common/authorHot';
import Card from '@/components/common/card';
import ArticleSort from '@/components/common/articleSort';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Home',
    components: {
        HomeLayout,
        InfiniteScroll,
        ArticleItem,
        ArticleTag,
        SpecialTopic,
        authorHot,
        Card,
        ArticleSort
    },
    mixins: [ articleCommon ],
    data() {
        return {
            listData: [],
            tagRecommendData: [], // Tag推荐
            authorRecommendData: [], // 作者推荐
            topicRecommendData: [], // 专题推荐
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
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
                this.refresh(n);
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
        refresh(sortType) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList(sortType);
        },
        getList(sortType) {
            const params = {
                publish: true,
                sortType,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.articleQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
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
