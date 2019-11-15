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
            @scroll="handleScroll"
            @loadData="getList">
            <template slot-scope="scope">
                <article-item
                    :item="scope.row.articleId"
                    :item-id="scope.row._id"
                    :is-action="isAction">
                    <template slot-scope="scope">
                        <div class="menu">
                            <button @click="handleDelete(scope.itemId, scope.row._id)">
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
    name: 'ZoneCollectList',
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
        handleScroll(val) {
            this.$emit('scroll', val);
        },
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
            api.collectQuery(params).then((res) => {
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
        handleDelete(collectId, articlePublishId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.collectDelete(collectId, articlePublishId).then(() => {
                    this.showSuccessMsg('删除成功！');
                    this.refresh();
                }).catch(() => {});
            }).catch(() => {});
        }
    }
};
</script>
