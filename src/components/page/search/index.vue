<template>
    <div>
        <tab :activeName="activeTabName" @tabClick="handleTabClick">
            <tab-label name="article" label="文章"></tab-label>
            <tab-label name="topic" label="专题"></tab-label>
            <!-- <tab-label name="author" label="作者"></tab-label>
            <tab-label name="tag" label="标签"></tab-label> -->
        </tab>
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList(keyword, activeTabName)">
            <template slot-scope="scope">
                <article-item v-if="activeTabName === 'article'"  :item="scope.row">
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
                </article-item>
                <topic-item v-if="activeTabName === 'topic'" :item="scope.row"></topic-item>
            </template>
        </infinite-scroll>
    </div>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import TopicItem from '@/components/common/topicItem';
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Search',
    mixins: [ articleCommon ],
    components: {
        InfiniteScroll,
        ArticleItem,
        TopicItem,
        Tab,
        TabLabel
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
            return this.$route.params.keyword;
        }
    },
    watch: {
        keyword: {
            handler(n, o) {
                this.refresh(n, this.activeTabName);
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
                apiName = 'articleQuery';
                params.publish = true;
            }
            if (tabName === 'topic') {
                apiName = 'topicQuery';
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
            this.refresh(this.keyword, tabName);
        }
    }
};
</script>
