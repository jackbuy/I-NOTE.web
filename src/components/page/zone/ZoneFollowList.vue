<template>
    <card :visible-header="true" :padding="false">
        <tab :activeName="activeType" @tabClick="handleTab">
            <tab-label name="followUser" label="作者"></tab-label>
            <tab-label name="followTopic" label="专题"></tab-label>
            <tab-label name="followTag" label="标签"></tab-label>
        </tab>
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <follow-user-item
                    v-if="activeType === 'followUser'"
                    :item="scope.row">
                </follow-user-item>
                <follow-topic-item
                    v-if="activeType === 'followTopic'"
                    :item="scope.row">
                </follow-topic-item>
                <follow-tag-item
                    v-if="activeType === 'followTag'"
                    :item="scope.row">
                </follow-tag-item>
            </template>
        </infinite-scroll>
    </card>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import FollowUserItem from '@/components/common/followUserItem';
import FollowTagItem from '@/components/common/followTagItem';
import FollowTopicItem from '@/components/common/followTopicItem';
import Card from '@/components/common/card';
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import api from '@/utils/api';

export default {
    name: 'ZoneFollowUserList',
    props: {
        type: String,
        userId: String
    },
    components: {
        InfiniteScroll,
        FollowUserItem,
        FollowTagItem,
        FollowTopicItem,
        Tab,
        TabLabel,
        Card
    },
    data() {
        return {
            activeType: 'followUser', // 默认显示
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
        handleTab(type) {
            this.activeType = type;
            this.refresh();
        },
        getList() {
            let params = {
                userId: this.userId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            let apiStr = '';
            if (this.activeType === 'followUser') apiStr = 'followUserQuery';
            if (this.activeType === 'followTopic') apiStr = 'followTopicQuery';
            if (this.activeType === 'followTag') apiStr = 'followTagQuery';

            this.loading = true;
            api[apiStr](params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>
