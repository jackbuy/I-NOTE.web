<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList">
        <template slot-scope="scope">
            <article-item
                :item="scope.row"
                :item-id="scope.row._id"
                @edit="handleRouterEdit"
                @delete="handleDelete">
            </article-item>
        </template>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneArticleList',
    props: {
        type: String,
        userId: String
    },
    mixins: [ message ],
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
            }).catch(() => {
                this.loading = false;
            });
        },
        handleDelete(itemId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(itemId).then(() => {
                    this.refresh();
                    this.showSuccessMsg('删除成功！');
                }).catch(() => {});
            }).catch(() => {});
        },
        // 跳转文章编辑
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`).catch(() => {});
        }
    }
};
</script>
