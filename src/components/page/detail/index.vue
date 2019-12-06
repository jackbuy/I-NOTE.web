<template>
    <detail-layout :is-has="isHas" :pageLoading='pageLoading'>
        <div slot="menu" class="detail__menu">
            <div>
                <button
                    :disabled="loading"
                    :class="{'active': isLike}"
                    title="点赞"
                    @click="handleLike(isLike)">
                    <i v-if="isLike" class="icon icon-dianzan"></i>
                    <i v-else class="icon icon-dianzan-o"></i>
                    <span v-if="likeCount > 0">{{ likeCount }}</span>
                </button>
                <div class="title">点赞</div>
            </div>
            <div>
                <button
                    :disabled="loading"
                    :class="{'active': isCollect}"
                    title="收藏"
                    @click="handleCollect(isCollect)">
                    <i v-if="isCollect" class="icon icon-shoucang"></i>
                    <i v-else class="icon icon-shoucang-o"></i>
                    <span v-if="collectCount > 0">{{ collectCount }}</span>
                </button>
                <div class="title">收藏</div>
            </div>
        </div>
        <card slot="content" :visible-header="true">
            <article-content
                :title="title"
                :content="content"
                :viewCount="viewCount"
                :time="time"
                :tag="tag">
                <span v-if="currentUserId === authorId">
                    <el-dropdown
                        @command="handleCommand">
                        <i class="icon icon-more-horizontal"></i>
                        <el-dropdown-menu class="write-dropdown-menu">
                            <el-dropdown-item
                                command="edit"
                                icon="el-icon-delete">编辑</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </article-content>
        </card>
        <card slot="comment" icon="icon icon-pinglun" title="评论">
            <article-comment
                :articleId="articleId"
                :authorId="authorId">
            </article-comment>
        </card>
        <card slot="userinfo" :visible-header="true" icon="icon icon-zuozhe" title="关于作者">
            <user-info
                :user="userInfo"
                @doFollow="handleFollow">
            </user-info>
        </card>
        <card slot="recommend" icon="icon icon-wenzhang" title="Ta的热文" class="fixed">
            <article-recommend
                v-for="item in recommendFilterData"
                :key="item._id"
                :item="item">
            </article-recommend>
        </card>
    </detail-layout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { SET_DOCUMENT_TITLE } from '@/store/mutation-types';
import DetailLayout from './Layout';
import Card from '_c/card';
import UserInfo from '_c/userInfo';
import ArticleRecommend from '_c/articleRecommend';
import ArticleComment from '_c/articleComment';
import ArticleContent from '_c/articleContent';
import api from '_u/api';
import utils from '_u/utils';
import To from '_u/to';
import topicArticleAdd from '@/mixins/topicArticleAdd';

export default {
    name: 'ArticleDetail',
    components: {
        DetailLayout,
        Card,
        UserInfo,
        ArticleRecommend,
        ArticleComment,
        ArticleContent
    },
    mixins: [ topicArticleAdd ],
    data() {
        return {
            loading: false,
            detail: {},
            recommendData: [],
            isHas: true,
            pageLoading: false
        };
    },
    computed: {
        ...mapGetters({
            currentUserId: 'currentUserId'
        }),
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
            return this.detail.isLike || false;
        },
        isCollect() {
            return this.detail.isCollect || false;
        },
        recommendFilterData() {
            let arr = [];
            this.recommendData.map((item) => {
                if (item._id !== this.articleId) arr.push(item);
            });
            return arr;
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
            setDocumentTitle: SET_DOCUMENT_TITLE
        }),
        handleCommand(command) {
            if (command === 'edit') this.handleRouterEdit(this.aId);
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
            this.isHas = true;
            this.pageLoading = false;
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
