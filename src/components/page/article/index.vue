<template>
    <article-list
        :load-more="isLoadMore"
        :no-more="isLoadFinish"
        :data="articleData">
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
</template>

<script>
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import articleListCommon from '@/mixins/articleListCommon';
import api from '@/utils/api';

export default {
    name: 'Search',
    mixins: [ articleListCommon ],
    components: {
        ArticleList,
        ArticleListItem
    },
    data() {
        return {
            articleData: [],
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
                this.getArticleList(n);
            },
            immediate: true
        }
    },
    methods: {
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList(this.tagName);
        },
        getArticleList(tagName, loadType = 'loadMore') {
            const params = {
                publish: true,
                tagName,
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
        }
    }
};
</script>
