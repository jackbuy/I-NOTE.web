<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList">
        <template slot-scope="scope">
            <topic-item :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterTopicEdit(scopeInner.row._id)">
                        <i class="el-icon-edit"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleDelete(scopeInner.row)">
                        <i class="el-icon-delete"></i>
                    </button>
                </template>
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
        handleDelete(row) {
            const { _id } = row;
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.topicDelete(_id).then(() => {
                    this.showSuccessMsg('删除成功！');
                    this.refresh();
                }).catch(() => {});
            }).catch(() => {});
        }
    }
};
</script>
