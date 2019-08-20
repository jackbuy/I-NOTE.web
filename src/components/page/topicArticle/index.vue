<template>
    <layout>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <article-item
                slot-scope="scope"
                :item="scope.row">
            </article-item>
        </infinite-scroll>
        <card slot="topic" icon="icon icon-bq" :title="topicDetail.title">
            <div
                slot="content"
                class="topic-description">
                <div>{{ topicDetail.description }}</div>
                <div>{{ createTime }}</div>
            </div>
        </card>
    </layout>
</template>

<script>
import Layout from './layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';
import utils from '@/utils/utils';

export default {
    name: 'ZoneArticleList',
    props: {
        type: String,
        userId: String
    },
    mixins: [ articleCommon ],
    components: {
        Layout,
        Card,
        InfiniteScroll,
        ArticleItem
    },
    data() {
        return {
            listData: [],
            topicDetail: {},
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        topicId() {
            return this.$route.params.topicId;
        },
        createTime() {
            if (this.topicDetail) return `创建于 ${utils.formatDate.date(this.topicDetail.createTime)}`;
        }
    },
    watch: {
        topicId: {
            handler(n, o) {
                this.refresh(n);
            },
            immediate: true
        }
    },
    methods: {
        refresh(topicId) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList();
            this.getTopicInfo(topicId);
        },
        getList() {
            const params = {
                topicId: this.topicId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.topicArticleQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            });
        },
        getTopicInfo(topicId) {
            api.topicDetail(topicId).then((res) => {
                this.topicDetail = res.data;
            });
        }
    }
};
</script>
