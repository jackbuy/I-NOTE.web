<template>
    <infinite-scroll
        :data="listData"
        :loading="loading"
        :no-more="noMore"
        @loadData="getList">
        <template slot-scope="scope">
            <topic-item :item="scope.row"></topic-item>
        </template>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import TopicItem from '@/components/common/topicItem';
import api from '@/utils/api';

export default {
    name: 'Search',
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
    created() {
        this.getList();
    },
    methods: {
        getList() {
            const params = {
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.topicQuery(params).then((res) => {
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
