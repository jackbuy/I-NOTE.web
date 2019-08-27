<template>
    <layout>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList">
            <template slot-scope="scope">
                <article-item :item="scope.row"></article-item>
            </template>
        </infinite-scroll>
        <card slot="topicDetail" icon="icon icon-zhuanti" :title="topicDetail.title">
            <template slot="menu">
                <div class="menu">
                    <div v-if="userId !== mine" @click="handleFollow(topicDetail._id)" class="menu-btn">
                        <span v-if="!topicDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                </div>
            </template>
            <template>
                <div v-if="img" class="topic-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
                <div class="topic-description">
                    {{ topicDetail.description }}
                </div>
                <div class="time">{{ createTime }}</div>
            </template>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import UserInfo from '@/components/common/userInfo';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';
import utils from '@/utils/utils';

export default {
    name: 'TopicArticle',
    mixins: [ articleCommon ],
    components: {
        Layout,
        Card,
        InfiniteScroll,
        ArticleItem,
        UserInfo
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
        img() {
            return this.topicDetail.img ? this.topicDetail.img : '';
        },
        topicId() {
            return this.$route.params.topicId;
        },
        createTime() {
            if (this.topicDetail) return `创建于 ${utils.formatDate.date(this.topicDetail.createTime)}`;
        },
        userInfo() {
            if (this.topicDetail.userId) return this.topicDetail.userId;
        },
        mine() {
            return localStorage.getItem('userId');
        },
        userId() {
            if (this.topicDetail.userId) return this.topicDetail.userId._id;
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
            api.topicDetail({ topicId }).then((res) => {
                this.topicDetail = res.data;
            });
        },
        // 关注
        handleFollow(tagId) {
            const params = {
                followId: tagId,
                type: 1
            };
            api.follow(params).then(() => {
                this.topicDetail.isFollow = !this.topicDetail.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
