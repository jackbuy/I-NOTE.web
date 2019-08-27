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
    name: 'ZoneArticleList',
    props: {
        type: String,
        userId: String
    },
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
        zone() {
            return `${this.type}${this.userId}`;
        }
    },
    watch: {
        zone: {
            handler(n, o) {
                this.refresh();
            },
            immediate: true
        }
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
                publish: true,
                userId: this.userId,
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
