<template>
    <detail-layout :is-has="isHas" :pageLoading='pageLoading'>
        <div slot="menu" class="article-detail__menu">
            <div>
                <button
                    :disabled="loading"
                    :class="{'active': isLike}"
                    @click="handleLike(isLike)">
                    <i v-if="isLike" class="icon icon-dianzan"></i>
                    <i v-else class="icon icon-dianzan-o"></i>
                    <span v-if="likeCount > 0">{{ likeCount }}</span>
                </button>
                <div class="title">赞</div>
            </div>
            <div>
                <button
                    :disabled="loading"
                    :class="{'active': isCollect}"
                    @click="handleCollect(isCollect)">
                    <i v-if="isCollect" class="icon icon-like"></i>
                    <i v-else class="icon icon-like-o"></i>
                    <span v-if="collectCount > 0">{{ collectCount }}</span>
                </button>
                <div class="title">收藏</div>
            </div>
            <div>
                <el-popover
                    popper-class="topic-list-box"
                    placement="right"
                    width="210">
                    <div class="list">
                        <template v-if="topicList.length > 0">
                            <div
                                v-for="item in topicList"
                                :key="item._id"
                                :class="{'active': item.isTopic}"
                                @click="handleAddTopicList(item)">
                                <i class="el-icon-circle-check"></i>
                                {{ item.title }}
                            </div>
                        </template>
                    </div>
                    <div class="add" @click="handleCreateTopic">
                        <i class="el-icon-circle-plus"></i>
                        <span>创建专题</span>
                    </div>
                    <div slot="reference">
                        <button
                            :class="{'active': isTopic}"
                            :disabled="loading">
                            <i v-if="isTopic" class="icon icon-shoucang"></i>
                            <i v-else class="icon icon-shoucang-o"></i>
                        </button>
                        <div class="title">加入专题</div>
                    </div>
                </el-popover>
            </div>
        </div>
        <card slot="content" :padding="false" :title="tag">
            <div slot="menu" class="menu">
                <div
                    v-if="currentUserId === authorId"
                    class="menu-btn round"
                    @click="handleRouterEdit(aId)">
                    编辑
                </div>
            </div>
            <div class="article-detail">
                <div class="article-detail__title">
                    {{ title }}
                </div>
                <div
                    v-highlightB
                    v-html="content"
                    class="article-detail__content">
                </div>
                <div class="article-detail__info">
                    <span>{{ time }}</span>
                    <span><i class="icon icon-chakan"></i> {{ viewCount }}</span>
                </div>
            </div>
        </card>
        <card slot="comment" icon="icon icon-pinglun" title="评论">
            <article-comment
                :articleId="articleId"
                :authorId="authorId"></article-comment>
        </card>
        <card slot="userinfo" :visible-header="true" icon="icon icon-zuozhe" title="关于作者">
            <user-info
                v-if="userInfo"
                :user="userInfo"
                @doFollow="handleFollow">
            </user-info>
        </card>
        <card slot="userinfo" icon="icon icon-wenzhang" title="Ta的热文">
            <article-recommend
                v-for="item in recommendFilterData"
                :key="item._id"
                :item="item"
                @doDetail="handleRecommend">
            </article-recommend>
        </card>
    </detail-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_DOCUMENT_TITLE, OPEN_LOGIN_MODAL } from '@/store/mutation-types';
import DetailLayout from './Layout';
import Card from '_c/card';
import UserInfo from '_c/userInfo';
import ArticleRecommend from '_c/articleRecommend';
import ArticleComment from '_c/articleComment';
import api from '_u/api';
import utils from '_u/utils';
import To from '_u/to';
export default {
    name: 'ArticleDetail',
    components: {
        DetailLayout,
        Card,
        UserInfo,
        ArticleRecommend,
        ArticleComment
    },
    data() {
        return {
            loading: false,
            detail: {},
            recommendData: [],
            topicList: [],
            isHas: true,
            pageLoading: false
        };
    },
    computed: {
        articleId() {
            return this.$route.params.articleId;
        },
        title() {
            return this.detail.title;
        },
        content() {
            return this.detail.contentHtml;
        },
        userInfo() {
            if (this.detail.userId) return this.detail.userId;
        },
        authorId() {
            if (this.userInfo) return this.userInfo._id;
        },
        time() {
            if (this.detail && this.detail.publishTime) {
                let time = this.detail.publishTime;
                let end = utils.formatDate.time(time);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        tag() {
            if (this.detail && this.detail.tagId && this.detail.tagId.parentId) {
                return `${this.detail.tagId.parentId.title} · ${this.detail.tagId.title}`;
            };
        },
        likeCount() {
            return this.detail.likeCount || 0;
        },
        collectCount() {
            return this.detail.collectCount || 0;
        },
        viewCount() {
            return this.detail.viewCount || 0;
        },
        isLike() {
            return this.detail.isLike;
        },
        isCollect() {
            return this.detail.isCollect;
        },
        isTopic() {
            let isTopic = false;
            this.topicList.map((item) => {
                if (item.isTopic) isTopic = true;
            });
            return isTopic;
        },
        recommendFilterData() {
            let arr = [];
            this.recommendData.map((item) => {
                if (item._id !== this.articleId) arr.push(item);
            });
            return arr;
        },
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        },
        aId() {
            return this.detail.articleId;
        }
    },
    watch: {
        articleId: {
            handler(n, o) {
                this.getDetail(n);
            },
            immediate: true
        }
    },
    destroyed() {
        this.setDocumentTitle('');
    },
    methods: {
        ...mapMutations({
            setDocumentTitle: SET_DOCUMENT_TITLE,
            openLoginModal: OPEN_LOGIN_MODAL
        }),
        handleCreateTopic() {
            this.currentUserId ? this.handleRouterPath('/topicWrite') : this.openLoginModal();
        },
        // 获取文章详情
        async getDetail(articleId) {
            this.pageLoading = true;
            const params = { articleId };
            let [ err, result ] = await To(api.articlePublishDetail(params));
            if (err || !result || !result.data) {
                this.isHas = false;
                this.pageLoading = false;
                return;
            };
            this.detail = result.data;
            this.setDocumentTitle(result.data.title);
            await this.recommend(result.data.userId._id);
            await this.getIsTopicList(articleId);
            this.isHas = true;
            this.pageLoading = false;
        },
        // 获取专题列表
        getIsTopicList(articleId) {
            if (this.currentUserId) { // 登录用户才发请求
                const params = {
                    articleId,
                    pageSize: 10000,
                    currentPage: 1
                };
                api.getTopicList(params).then((res) => {
                    this.topicList = res.data;
                }).catch(() => {});
            }
        },
        // 加入专题
        handleAddTopicList(row) {
            const { _id, isTopic } = row;
            if (!isTopic) {
                const params = {
                    topicId: _id,
                    articleId: this.articleId,
                    articleTitle: this.detail.title
                };
                api.topicArticleAdd(params).then(() => {
                    this.getIsTopicList(this.articleId);
                }).catch(() => {});
            }
        },
        // 关注
        handleFollow(followUserId) {
            api.followUser({ followUserId }).then(() => {
                this.detail.userId.isFollow = !this.detail.userId.isFollow;
            }).catch(() => {});
        },
        // 收藏
        handleCollect(type) {
            const { _id, title } = this.detail;
            const params = {
                articleId: _id,
                articleTitle: title
            };

            this.loading = true;
            api.articlePublishCollect(params).then(() => {
                if (!type) {
                    this.detail.isCollect = true;
                    this.detail.collectCount++;
                } else {
                    this.detail.isCollect = false;
                    this.detail.collectCount--;
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 赞
        handleLike(type) {
            const { _id, title } = this.detail;
            const params = {
                articleId: _id,
                articleTitle: title
            };

            this.loading = true;
            api.articlePublishLike(params).then(() => {
                if (!type) {
                    this.detail.isLike = true;
                    this.detail.likeCount++;
                } else {
                    this.detail.isLike = false;
                    this.detail.likeCount--;
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 相关文章
        recommend(userId) {
            const params = {
                pageSize: 5,
                currentPage: 1,
                sortType: 'popular',
                userId
            };
            api.articlePublishQuery(params).then((res) => {
                this.recommendData = res.data;
            }).catch(() => {});
        },
        // 详情
        handleRecommend(articleId) {
            let path = `/detail/${articleId}`;
            this.handleRouterPath(path);
        },
        // 编辑
        handleRouterEdit(articleId) {
            let path = `/write/${articleId}`;
            this.handleRouterPath(path);
        },
        handleRouterPath(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
