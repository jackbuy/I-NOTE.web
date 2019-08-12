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
                    v-if="scopeInner.row.userId._id === currentUserId"
                    @click="handleEdit(scopeInner.row)">
                    <i class="el-icon-edit"></i>
                </button>
                <button
                    v-if="scopeInner.row.userId._id === currentUserId"
                    @click="handleDelete(scopeInner.row)">
                    <i class="el-icon-delete"></i>
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
    created() {
        this.getArticleList();
    },
    methods: {
        refresh() {
            this.pageConfig.currentPage = 1;
            this.articleData = [];
            this.isLoadFinish = false;
            this.getArticleList('load');
        },
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList();
        },
        getArticleList(loadType = 'loadMore') {
            const params = {
                publish: false,
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
        handleEdit(row) {
            const { _id } = row;
            this.$router.push(`/write/${_id}`);
        },
        handleDelete(row) {
            const { _id } = row;
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(_id).then(() => {
                    this.refresh();
                    this.showSuccessMsg('删除成功！');
                });
            }).catch(() => {});
        }
    }
};
</script>
