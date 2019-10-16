<template>
    <card :visible-header="true" :padding="false">
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <fans-item :item="scope.row">
                </fans-item>
            </template>
        </infinite-scroll>
    </card>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import FansItem from '@/components/common/fansItem';
import Card from '@/components/common/card';
import api from '@/utils/api';

export default {
    name: 'ZoneFansList',
    props: {
        type: String,
        userId: String,
        currentUserId: String
    },
    components: {
        InfiniteScroll,
        FansItem,
        Card
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
                type: 0,
                userId: this.userId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.fansQuery(params).then((res) => {
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
