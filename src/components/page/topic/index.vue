<template>
    <layout>
        <card
            slot="content"
            :padding="false"
            :visible-header="true"
            icon="icon icon-zhuanti"
            title="专题">
            <infinite-scroll
                :data="listData"
                :loading="loading"
                :no-more="noMore"
                @loadData="getList">
                <template slot-scope="scope">
                    <topic-item
                        :item="scope.row"
                        :show-menu-edit="false"
                        :show-menu-delete="false">
                    </topic-item>
                </template>
            </infinite-scroll>
        </card>
        <card slot="introduce" :visible-header="true" :padding="false" title="介绍">
            <introduce></introduce>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import TopicItem from '@/components/common/topicItem';
import Introduce from '@/components/common/introduce';
import Card from '@/components/common/card';
import api from '@/utils/api';

export default {
    name: 'Search',
    components: {
        Layout,
        InfiniteScroll,
        Introduce,
        TopicItem,
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
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>
