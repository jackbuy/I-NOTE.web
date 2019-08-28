<template>
    <container :is-not-find="isNotFind" :loading="loading" tips="专题不存在">
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
            <card slot="topicDetail" icon="icon icon-zhuanti" :title="topicTitle">
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
            <card slot="author" icon="icon icon-zuozhe" title="管理员">
                <author :item="userInfo"></author>
            </card>
        </layout>
    </container>
</template>

<script>
import Layout from './Layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import Author from '@/components/common/author';
import Container from '@/components/common/container';
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';
import utils from '@/utils/utils';

export default {
    name: 'TopicArticle',
    mixins: [ articleCommon ],
    components: {
        Layout,
        Container,
        Card,
        InfiniteScroll,
        ArticleItem,
        Author
    },
    data() {
        return {
            isNotFind: false,
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
            }).catch(() => {
                this.loading = false;
            });
        },
        getTopicInfo(topicId) {
            this.loading = true;
            api.topicDetail({ topicId }).then((res) => {
                this.loading = false;
                this.isNotFind = false;
                this.topicDetail = res.data;
                this.getList(topicId);
            }).catch(() => {
                this.loading = false;
                this.isNotFind = true;
            });
        },
        // 关注
        handleFollow(topicId) {
            const params = {
                followId: topicId,
                type: 1
            };
            api.follow(params).then(() => {
                this.topicDetail.isFollow = !this.topicDetail.isFollow;
            }).catch(() => {});
        }
    }
};
</script>