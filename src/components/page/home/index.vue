<template>
    <home-layout>
        <card slot="content" :visible-header="true" :padding="false">
            <!-- <tab :activeName="sortType" @tabClick="handleSort">
                <tab-label name="newest" label="最新"></tab-label>
                <tab-label name="popular" label="热门"></tab-label>
            </tab> -->
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(sortType)">
                <template slot-scope="scope">
                    <article-item
                        :item="scope.row">
                    </article-item>
                </template>
            </infinite-scroll>
        </card>
        <card slot="tag" icon="icon icon-bq" title="标签">
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
        <card slot="topic" icon="icon icon-zhuanti" title="专题榜">
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
        <card slot="author" icon="icon icon-zuozhe" title="创作榜">
            <author-recommend
                v-for="item in authorRecommendData"
                :key="item._id"
                :item="item">
            </author-recommend>
        </card>
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
    data() {
        return {
            sortType: 'newest',
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
    created() {
        this.getTagRecommend();
        this.getUserRecommend();
        this.getTopicRecommend();
        this.getList(this.sortType);
    },
    activated() {
        this.getTagRecommend();
        this.getUserRecommend();
        this.getTopicRecommend();
        // this.handleSort(this.sortType);
    },
    methods: {
        getList(sortType) {
            const params = {
                sortType,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.articlePublishQuery(params).then((res) => {
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
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList(sortType);
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
