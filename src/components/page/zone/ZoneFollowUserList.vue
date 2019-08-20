<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        @loadData="getList">
        <follow-user-item
            slot-scope="scope"
            :item="scope.row">
        </follow-user-item>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import FollowUserItem from '@/components/common/followUserItem';
import api from '@/utils/api';

export default {
    name: 'ZoneFollowUserList',
    props: {
        type: String,
        userId: String
    },
    components: {
        InfiniteScroll,
        FollowUserItem
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
    watch: {
        type: {
            handler(n, o) {
                this.refresh(n);
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
                type: 0,
                userId: this.userId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.followQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            });
        }
    }
};
</script>
