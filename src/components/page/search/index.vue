<template>
    <div class="search">
        <search-box
            placeholder="搜 文章 · 专题 · 作者"
            @search="handlSearch">
        </search-box>
        <card :visible-header="true" :padding="false">
            <tab :activeName="activeTabName" @tabClick="handleTabClick">
                <tab-label name="article" label="文章"></tab-label>
                <tab-label name="topic" label="专题"></tab-label>
                <tab-label name="author" label="作者"></tab-label>
            </tab>
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(keyword, activeTabName)">
                <template slot-scope="scope">
                    <article-item
                        v-if="activeTabName === 'article'"
                        :item="scope.row">
                    </article-item>
                    <topic-item
                        v-if="activeTabName === 'topic'"
                        :item="scope.row"
                        :show-menu-edit="false"
                        :show-menu-delete="false">
                    </topic-item>
                    <author-item
                        v-if="activeTabName === 'author'"
                        :item="scope.row">
                    </author-item>
                </template>
            </infinite-scroll>
        </card>
    </div>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import AuthorItem from '@/components/common/authorItem';
import ArticleItem from '@/components/common/articleItem';
import TopicItem from '@/components/common/topicItem';
import Card from '@/components/common/card';
import SearchBox from '@/components/common/searchBox';
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import api from '@/utils/api';

export default {
    name: 'Search',
    components: {
        InfiniteScroll,
        ArticleItem,
        TopicItem,
        AuthorItem,
        Tab,
        TabLabel,
        Card,
        SearchBox
    },
    data() {
        return {
            activeTabName: 'article',
            listData: [],
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        keyword() {
            return this.$route.query.keyword;
        }
    },
    watch: {
        keyword: {
            handler(n, o) {
                if (n) {
                    this.refresh(n, this.activeTabName);
                }
            },
            immediate: true
        }
    },
    methods: {
        refresh(keyword, tabName) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList(keyword, tabName);
        },
        getList(keyword, tabName) {
            let apiName = '';
            let params = {
                keyword,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (tabName === 'article') {
                apiName = 'articlePublishQuery';
                params.publish = true;
            }
            if (tabName === 'topic') {
                apiName = 'topicQuery';
            };
            if (tabName === 'author') {
                apiName = 'userQuery';
            };
            this.loading = true;
            api[apiName]({ ...params }).then((res) => {
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
        handleTabClick(tabName) {
            this.activeTabName = tabName;
            if (this.keyword) {
                this.refresh(this.keyword, tabName);
            }
        },
        handlSearch(keyword) {
            if (keyword.length > 0) {
                const path = {
                    path: `/search`,
                    query: {
                        keyword
                    }
                };
                this.$router.push(path).catch(() => {});
            }
        }
    }
};
</script>
