<template>
    <msg-layout>
        <tab slot="header" :activeName="activeTabName" @tabClick="handleTabClick">
            <tab-label name="notifications" label="未读"></tab-label>
            <tab-label name="all" label="全部"></tab-label>
            <tab-label name="like" label="点赞"></tab-label>
            <tab-label name="collect" label="收藏"></tab-label>
            <tab-label name="followUser" label="关注的作者"></tab-label>
            <tab-label name="followTopic" label="关注的专题"></tab-label>
        </tab>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList()">
            <template slot-scope="scope">
                <msg-list-item :data="scope.row"></msg-list-item>
            </template>
        </infinite-scroll>
    </msg-layout>
</template>

<script>
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import MsgLayout from './Layout';
import MsgListItem from './src/MsgListItem';
import api from '@/utils/api';
export default {
    name: 'MsgCenter',
    components: {
        MsgLayout,
        MsgListItem,
        Tab,
        TabLabel,
        InfiniteScroll
    },
    data() {
        return {
            activeTabName: 'notifications',
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
            let params = {
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (this.activeTabName === 'notifications') params.isRead = false;
            if (this.activeTabName === 'like') {
                params.type = 0;
                params.isRead = false;
            };
            if (this.activeTabName === 'collect') {
                params.type = 1;
                params.isRead = false;
            }
            if (this.activeTabName === 'followUser') {
                params.type = 2;
                params.isRead = false;
            }
            if (this.activeTabName === 'followTopic') {
                params.type = 3;
                params.isRead = false;
            }
            this.loading = true;
            api.messageQuery({ ...params }).then((res) => {
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
        handleTabClick(tabName) {
            this.activeTabName = tabName;
            this.refresh();
        }
    }
};
</script>
