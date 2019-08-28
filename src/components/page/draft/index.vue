<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList">
        <template slot-scope="scope">
            <article-item :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterEdit(scopeInner.row._id)">
                        <i class="el-icon-edit"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleDelete(scopeInner.row)">
                        <i class="el-icon-delete"></i>
                    </button>
                </template>
            </article-item>
        </template>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Draft',
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
    created() {
        this.getList();
    },
    methods: {
        refresh() {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList();
        },
        getList() {
            const params = {
                publish: false,
                userId: this.currentUserId,
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
