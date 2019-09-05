<template>
    <home-layout>
        <template slot="header">
            <tab :activeName="sortType" @tabClick="handleSort">
                <tab-label name="newest" label="最新"></tab-label>
                <tab-label name="popular" label="热门"></tab-label>
            </tab>
        </template>
        <template slot="content">
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(sortType)">
                <template slot-scope="scope">
                    <article-item :item="scope.row">
                        <template slot-scope="scopeInner">
                            <button
                                :disabled="loading || scopeInner.row.userId._id === currentUserId"
                                :class="{'active': scopeInner.row.isLike}"
                                @click="handleLike(scopeInner.row._id, scopeInner.row.isLike)">
                                <i v-if="scopeInner.row.isLike" class="icon icon-dianzan"></i>
                                <i v-else class="icon icon-dianzan-o"></i>
                                {{ scopeInner.row.likeCount > 0 ? scopeInner.row.likeCount : '' }}
                            </button>
                            <button
                                :disabled="loading || scopeInner.row.userId._id === currentUserId"
                                :class="{'active': scopeInner.row.isCollect}"
                                @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                                <i v-if="scopeInner.row.isCollect" class="icon icon-like"></i>
                                <i v-else class="icon icon-like-o"></i>
                                {{ scopeInner.row.collectCount > 0 ? scopeInner.row.collectCount : '' }}
                            </button>
                            <button
                                @click="handleComment(scopeInner.row._id)">
                                <i class="icon icon-pinglun"></i>
                                {{ scopeInner.row.commentCount > 0 ? scopeInner.row.commentCount : '' }}
                            </button>
                        </template>
                    </article-item>
                </template>
            </infinite-scroll>
        </template>
        <template slot="tag">
            <card icon="icon icon-bq" title="标签">
                <template slot="menu">
                    <div class="menu">
                        <span class="menu-btn" @click="handleRouterPush('/tag')">全部</span>
                    </div>
                </template>
                <tag-recommend
                    v-for="item in tagRecommendData"
                    :key="item._id"
                    :item="item">
                </tag-recommend>
            </card>
        </template>
        <template slot="topic">
            <card icon="icon icon-zhuanti" title="专题榜">
                <template slot="menu">
                    <div class="menu">
                        <span class="menu-btn" @click="handleRouterPush('/topic')">全部</span>
                    </div>
                </template>
                <topic-recommend
                    v-for="item in topicRecommendData"
                    :key="item._id"
                    :item="item">
                </topic-recommend>
            </card>
        </template>
        <template slot="author">
            <card icon="icon icon-zuozhe" title="创作榜">
                <author-recommend
                    v-for="item in authorRecommendData"
                    :key="item._id"
                    :item="item">
                </author-recommend>
            </card>
        </template>
    </home-layout>
</template>

<script>
import HomeLayout from './Layout';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import TagRecommend from '@/components/common/tagRecommend';
import TopicRecommend from '@/components/common/topicRecommend';
import AuthorRecommend from '@/components/common/authorRecommend';
import Card from '@/components/common/card';
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Home',
    components: {
        HomeLayout,
        InfiniteScroll,
        ArticleItem,
        TagRecommend,
        TopicRecommend,
        AuthorRecommend,
        Card,
        Tab,
        TabLabel
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
            }).catch(() => {
                this.loading = false;
            });
        },
        handleSort(sortType) {
            let path = `/find/${sortType}`;
            this.handleRouterPush(path);
        },
        getTagRecommend() {
            api.tagRecommend().then((res) => {
                this.tagRecommendData = res.data;
            }).catch(() => {});
        },
        getUserRecommend() {
            api.userRecommend().then((res) => {
                this.authorRecommendData = res.data;
            }).catch(() => {});
        },
        getTopicRecommend() {
            api.topicRecommend().then((res) => {
                this.topicRecommendData = res.data;
            }).catch(() => {});
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
