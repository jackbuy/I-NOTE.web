<template>
    <card slot="content" :padding="false" title="我的草稿" icon="icon icon-caogao">
        <div slot="menu" class="menu">
            <span
                v-if="listData.length > 0"
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
                            <button @click="handleRouterEdit(scope.row._id)">
                                <i class="el-icon-edit"></i>
                            </button>
                            <button @click="handleDelete(scope.row._id)">
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
            isAction: false,
            listData: [],
            pageConfig: {
                pageSize: 25,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        actionTitle() {
            return this.isAction ? '完成' : '编辑';
        }
    },
    created() {
        this.getList();
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
        // 删除
        handleDelete(articleId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(articleId).then(() => {
                    this.refresh();
                    this.showSuccessMsg('删除成功！');
                });
            }).catch(() => {});
        }
    }
};
</script>
