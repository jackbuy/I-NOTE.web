<template>
    <layout :is-has="isHas" :loading="pageLoading">
        <card slot="description" icon="icon icon-zhuanti" :title="topicTitle">
            <template slot="menu">
                <div class="menu">
                    <div v-if="userId !== currentUserId" @click="handleFollow(topicDetail._id, topicDetail.userId._id)" class="menu-btn round">
                        <span v-if="!topicDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                    <div v-else class="menu-btn round" @click="handleEdit(topicDetail._id)">编辑</div>
                </div>
            </template>
            <div class="topic-article__content-description">
                {{ description }}
            </div>
        </card>
        <card slot="content" :visible-header="userId !== currentUserId || listData.length === 0" :padding="false">
            <div slot="menu" class="menu">
                <span
                    class="menu-btn round"
                    @click="handleAction">{{ actionTitle}}</span>
            </div>
            <infinite-scroll
                v-if="listData && listData.length > 0"
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(topicId)">
                <template slot-scope="scope">
                    <article-item
                        :item="scope.row.articleId"
                        :is-action="isAction">
                        <!-- <template slot="title" slot-scope="scope">
                            <span @click="handleDetail(scope.row._id)">{{ scope.row.title }}</span>
                        </template> -->
                        <template slot-scope="scope">
                            <div class="menu">
                                <button @click="handleDelete(scope.row._id)">
                                    <i class="el-icon-delete"></i>
                                </button>
                            </div>
                        </template>
                    </article-item>
                </template>
            </infinite-scroll>
            <topic-empty
                v-else
                :is-mine="userId === currentUserId">
            </topic-empty>
        </card>
        <card slot="topicDetail" visible-header >
            <template>
                <div v-if="img" class="topic-img" @click="handleRead">
                    <div class="icon-box">阅读模式</div>
                    <div class="read">
                        <span>开始阅读</span>
                    </div>
                    <div class="img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
                </div>
                <div v-if="articleCount > 0" class="topic-count">文章 {{ articleCount }} 篇</div>
                <div v-if="followCount > 0" class="topic-count">关注 {{ followCount }} 人</div>
                <div class="topic-time">{{ createTime }}</div>
            </template>
        </card>
        <card slot="author" icon="icon icon-zuozhe" title="管理员">
            <user-recommend :item="userInfo"></user-recommend>
        </card>
    </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Layout from './Layout';
import TopicEmpty from './TopicEmpty';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import UserRecommend from '@/components/common/userRecommend';
import message from '@/mixins/message';
import api from '@/utils/api';
import utils from '@/utils/utils';
import { imgBaseUrl } from '@/constants/url-config';

export default {
    name: 'TopicArticle',
    mixins: [ message ],
    components: {
        Layout,
        Card,
        InfiniteScroll,
        ArticleItem,
        UserRecommend,
        TopicEmpty
    },
    data() {
        return {
            isAction: false,
            isHas: true,
            listData: [],
            topicDetail: {},
            pageLoading: false,
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        ...mapGetters({
            currentUserId: 'currentUserId'
        }),
        img() {
            return this.topicDetail.img ? `${imgBaseUrl}/${this.topicDetail.img}` : '';
        },
        topicTitle() {
            return this.topicDetail.title || '未命名专题';
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
        followCount() {
            return this.topicDetail.followCount;
        },
        articleCount() {
            return this.topicDetail.articleCount;
        },
        userInfo() {
            return this.topicDetail.userId;
        },
        userId() {
            return this.topicDetail.userId ? this.topicDetail.userId._id : '';
        },
        actionTitle() {
            return this.isAction ? '完成' : '编辑';
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
        handleRead() {
            if (this.listData && this.listData.length === 0) return;
            const articleId = this.listData[0].articleId._id;
            const path = `/topic/${this.topicId}/detail/${articleId}`;
            this.$router.push(path);
        },
        handleAction() {
            this.isAction = !this.isAction;
        },
        refresh(topicId) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getTopicInfo(topicId);
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
            this.pageLoading = true;
            api.topicDetail({ topicId }).then((res) => {
                this.topicDetail = res.data;
                this.getList(topicId);
                this.isHas = true;
                this.pageLoading = false;
            }).catch(() => {
                this.isHas = false;
                this.pageLoading = false;
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
        },
        // 删除专题文章
        handleDelete(articleId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.topicArticleDelete(this.topicId, articleId).then(() => {
                    let _ids = this.listData.map((item) => item.articleId._id);
                    let index = _ids.indexOf(articleId);
                    this.listData.splice(index, 1);
                    this.showSuccessMsg('删除成功');
                });
            }).catch(() => {});
        },
        // 编辑
        handleEdit(topicId) {
            this.$router.push(`/topicWrite/${topicId}`).catch(() => {});
        }
    }
};
</script>
