<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList(keyword)">
        <article-item
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
        </article-item>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Search',
    mixins: [ articleCommon ],
    components: {
        InfiniteScroll,
        ArticleItem
    },
    data() {
        return {
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
                this.refresh(n);
            },
            immediate: true
        }
    },
    methods: {
        refresh(keyword) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList(keyword);
        },
        getList(keyword) {
            const params = {
                publish: true,
                keyword,
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
        }
    }
};
</script>
