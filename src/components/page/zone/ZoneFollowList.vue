<template>
    <div>
        <div class="follow-tab">
            <span :class="{'active': activeType === 0}" @click="handleTab(0)">作者</span>
            <span :class="{'active': activeType === 1}" @click="handleTab(1)">专题</span>
            <span :class="{'active': activeType === 2}" @click="handleTab(2)">标签</span>
        </div>
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <follow-user-item
                    v-if="activeType === 0"
                    :item="scope.row">
                </follow-user-item>
                <follow-topic-item
                    v-if="activeType === 1"
                    :item="scope.row">
                </follow-topic-item>
                <follow-tag-item
                    v-if="activeType === 2"
                    :item="scope.row">
                </follow-tag-item>
            </template>
        </infinite-scroll>
    </div>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import FollowUserItem from '@/components/common/followUserItem';
import FollowTagItem from '@/components/common/followTagItem';
import FollowTopicItem from '@/components/common/followTopicItem';
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
        FollowTopicItem
    },
    data() {
        return {
            activeType: 0, // 默认显示
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
            if (this.activeType === 0) apiStr = 'followUserQuery';
            if (this.activeType === 1) apiStr = 'followTopicQuery';
            if (this.activeType === 2) apiStr = 'followTagQuery';

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
