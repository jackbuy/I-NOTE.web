<template>
    <card :padding="false" :visible-header="currentUserId !== userId || listData.length === 0">
        <div slot="menu" class="menu">
            <span
                class="menu-btn round"
                @click="handleAction">{{ actionTitle}}</span>
        </div>
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <article-item
                    :item="scope.row"
                    :is-action="isAction"
                    type="simple">
                    <template slot-scope="scope">
                        <div class="menu">
                            <button @click="handleRouterEdit(scope.row.articleId)">
                                <i class="el-icon-edit"></i>
                            </button>
                            <button @click="handleDelete(scope.row._id, scope.row.articleId)">
                                <i class="el-icon-delete"></i>
                            </button>
                        </div>
                    </template>
                </article-item>
            </template>
        </infinite-scroll>
    </card>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import Card from '@/components/common/card';
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneArticleList',
    props: {
        type: String,
        userId: String,
        currentUserId: String
    },
    mixins: [ message ],
    components: {
        InfiniteScroll,
        ArticleItem,
        Card
    },
    data() {
        return {
            isAction: false,
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
        },
        actionTitle() {
            return this.isAction ? '完成' : '编辑';
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
        handleAction() {
            this.isAction = !this.isAction;
        },
        refresh() {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList();
        },
        getList() {
            const params = {
                userId: this.userId,
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
        handleDelete(articlePublishId, articleId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articlePublishDelete(articlePublishId, articleId).then(() => {
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
