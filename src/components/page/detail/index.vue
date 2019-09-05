<template>
    <detail-layout>
        <div slot="menu" class="article-detail__menu">
            <button
                :disabled="loading || currentUserId === authorId"
                :class="{'active': isLike}"
                @click="handleLike(isLike)">
                <i v-if="isLike" class="icon icon-dianzan"></i>
                <i v-else class="icon icon-dianzan-o"></i>
                <span v-if="likeCount > 0">{{ likeCount }}</span>
            </button>
            <button
                :disabled="loading || currentUserId === authorId"
                :class="{'active': isCollect}"
                @click="handleCollect(isCollect)">
                <i v-if="isCollect" class="icon icon-like"></i>
                <i v-else class="icon icon-like-o"></i>
                <span v-if="collectCount > 0">{{ collectCount }}</span>
            </button>
            <el-popover
                popper-class="topic-list-box"
                placement="right"
                width="210">
                <div class="list">
                    <template v-if="topicList.length > 0">
                        <div
                            v-for="item in topicList"
                            :key="item._id"
                            :class="{'active': isAddTopicList(item)}"
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
                <button
                    slot="reference"
                    :disabled="loading"
                    :class="{'active': isTopic}">
                    <i v-if="isTopic" class="icon icon-shoucang"></i>
                    <i v-else class="icon icon-shoucang3"></i>
                </button>
            </el-popover>
        </div>
        <div slot="content" class="article-detail">
            <div class="article-detail__title">
                {{ title }}
                <span v-if="currentUserId === authorId" @click="handleRouterEdit(articleId)">编辑</span>
            </div>
            <div class="article-detail__info">
                <span :title="createTime">{{ editTime }}</span>
                <span>{{ tag }}</span>
                <span>浏览 {{ viewCount }}</span>
            </div>
            <div
                v-highlightB
                v-html="content"
                class="article-detail__content">
            </div>
        </div>
        <card slot="userinfo" :visible-header="false" icon="icon icon-zuozhe" title="关于作者">
            <user-info
                v-if="userInfo"
                :user="userInfo"
                @doFollow="handleFollow">
            </user-info>
        </card>
        <card slot="userinfo" icon="icon icon-wenzhang" title="相关文章">
            <article-recommend
                v-for="item in recommendFilterData"
                :key="item._id"
                :item="item"
                @doDetail="handleRecommend">
            </article-recommend>
        </card>
        <card slot="comment" icon="icon icon-pinglun" title="评论">
            <article-comment
                :articleId="articleId"
                :authorId="authorId"></article-comment>
        </card>
    </detail-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_DOCUMENT_TITLE, OPEN_LOGIN_MODAL } from '@/store/mutation-types';
import DetailLayout from './Layout';
import Card from '@/components/common/card';
import UserInfo from '@/components/common/userInfo';
import ArticleRecommend from '@/components/common/articleRecommend';
import ArticleComment from '@/components/common/articleComment';
import api from '@/utils/api';
import utils from '@/utils/utils';
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
            topicList: []
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
        createTime() {
            return `创建于 ${utils.formatDate.time(this.detail.createTime)}`;
        },
        editTime() {
            return `${utils.formatDate.time(this.detail.editTime)}`;
        },
        tag() {
            if (this.detail.tagId) return this.detail.tagId.title;
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
                if (this.isAddTopicList(item)) isTopic = true;
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
        }
    },
    watch: {
        articleId: {
            handler(n, o) {
                this.getDetail(n);
                this.getTopicList();
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
        isAddTopicList(row) {
            const { articleIds } = row;
            let arr = articleIds.split(',');
            const index = arr.indexOf(this.articleId);
            return index > -1;
        },
        getDetail(articleId) {
            const params = { articleId };
            api.getDetail(params).then((res) => {
                this.detail = res.data;
                this.setDocumentTitle(this.detail.title);
                this.recommend(this.detail.tagId._id);
            }).catch(() => {});
        },
        // 获取专题列表
        getTopicList() {
            if (this.currentUserId) { // 登录用户才发请求
                const params = {
                    userId: this.currentUserId,
                    pageSize: 10000,
                    currentPage: 1
                };
                api.topicUserQuery(params).then((res) => {
                    this.topicList = res.data;
                }).catch(() => {});
            }
        },
        handleAddTopicList(row) {
            const { _id, articleIds } = row;
            const ids = this.getArticleIds(articleIds, this.articleId);
            api.topicEdit(_id, { articleIds: ids }).then(() => {
                this.getTopicList();
            }).catch(() => {});
        },
        getArticleIds(str, articleId) {
            let arr = str.length > 0 ? str.split(',') : [];
            const index = arr.indexOf(articleId);
            if (index === -1) {
                arr.splice(index, 0, articleId);
            } else {
                arr.splice(index, 1);
            }
            return arr.join(',');
        },
        // 关注
        handleFollow(followUserId) {
            api.followUser({ followUserId }).then(() => {
                this.detail.userId.isFollow = !this.detail.userId.isFollow;
            }).catch(() => {});
        },
        // 收藏
        handleCollect(type) {
            this.loading = true;
            api.articleCollect(this.articleId).then(() => {
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
            this.loading = true;
            api.articleLike(this.articleId).then(() => {
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
        recommend(tagId) {
            const params = {
                publish: true,
                pageSize: 6,
                currentPage: 1,
                tagId
            };
            api.articleQuery(params).then((res) => {
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
