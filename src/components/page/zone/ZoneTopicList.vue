<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList">
        <template slot-scope="scope">
            <topic-item
                :item="scope.row"
                :item-id="scope.row._id"
                :show-menu-edit="scope.row.userId._id === currentUserId"
                :show-menu-delete="scope.row.userId._id === currentUserId"
                @edit="handleRouterTopicEdit"
                @delete="handleDelete">
            </topic-item>
        </template>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import TopicItem from '@/components/common/topicItem';
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneTopicList',
    props: {
        type: String,
        userId: String
    },
    mixins: [ message ],
    components: {
        InfiniteScroll,
        TopicItem
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
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        },
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
                userId: this.userId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.topicUserQuery(params).then((res) => {
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
        handleRouterTopicEdit(topicId) {
            this.$router.push({
                path: `/topicWrite/${topicId}`
            }).catch(() => {});
        },
        handleDelete(topicId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.topicDelete(topicId).then(() => {
                    this.showSuccessMsg('删除成功！');
                    this.refresh();
                }).catch(() => {});
            }).catch(() => {});
        }
    }
};
</script>
