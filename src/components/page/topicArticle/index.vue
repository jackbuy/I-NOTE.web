<template>
    <layout>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList(topicId)">
            <template slot-scope="scope">
                <article-item :item="scope.row"></article-item>
            </template>
        </infinite-scroll>
        <card slot="topicDetail" icon="icon icon-zhuanti" :title="topicTitle">
            <template slot="menu">
                <div class="menu">
                    <div v-if="userId !== mine" @click="handleFollow(topicDetail._id, topicDetail.userId._id)" class="menu-btn">
                        <span v-if="!topicDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                </div>
            </template>
            <template>
                <div v-if="img" class="topic-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
                <div v-if="description" class="topic-description">{{ description }}</div>
                <div class="topic-time">{{ createTime }}</div>
            </template>
        </card>
        <card slot="author" icon="icon icon-zuozhe" title="管理员">
            <author :item="userInfo"></author>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import Author from '@/components/common/author';
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
        Author
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
        topicTitle() {
            return this.topicDetail.title;
        },
        topicId() {
            return this.$route.params.topicId;
        },
        description() {
            return this.topicDetail.description;
        },
        createTime() {
            return this.topicDetail.createTime ? `创建于 ${utils.formatDate.date(this.topicDetail.createTime)}` : '';
        },
        userInfo() {
            return this.topicDetail.userId;
        },
        mine() {
            return localStorage.getItem('userId');
        },
        userId() {
            return this.topicDetail.userId ? this.topicDetail.userId._id : '';
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
            this.getTopicInfo(topicId);
            this.getList(topicId);
        },
        getList(topicId) {
            const params = {
                topicId,
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
            }).catch(() => {
                this.loading = false;
            });
        },
        getTopicInfo(topicId) {
            api.topicDetail({ topicId }).then((res) => {
                this.topicDetail = res.data;
            }).catch((err) => {
                if (err.code === 404) this.$router.replace('/404');
            });
        },
        // 关注
        handleFollow(topicId, userId) {
            const params = {
                followTopicId: topicId,
                followUserId: userId
            };
            api.followTopic(params).then(() => {
                this.topicDetail.isFollow = !this.topicDetail.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
