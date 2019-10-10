<template>
    <card slot="content" :visible-header="false" :padding="false" title="我的草稿" icon="icon icon-wenzhang">
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <article-item
                    :item="scope.row"
                    :item-id="scope.row._id"
                    item-type="draft"
                    @edit="handleRouterEdit"
                    @delete="handleDelete">
                </article-item>
            </template>
        </infinite-scroll>
    </card>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import message from '@/mixins/message';
import Card from '@/components/common/card';
import api from '@/utils/api';

export default {
    name: 'Draft',
    mixins: [ message ],
    components: {
        InfiniteScroll,
        ArticleItem,
        Card
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
        handleRouterEdit(articleId) {
            this.$router.push(`/write/${articleId}`).catch(() => {});
        },
        handleDelete(itemId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(itemId).then(() => {
                    this.refresh();
                    this.showSuccessMsg('删除成功！');
                });
            }).catch(() => {});
        }
    }
};
</script>
