<template>
    <article-layout>
        <article-list
            :data="articleData"
            :load-more="isLoadMore"
            :no-more="isLoadFinish"
            slot="content">
            <article-list-item
                slot-scope="scope"
                :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        v-if="scopeInner.row.isSupport"
                        class="active">已赞</button>
                    <button
                        v-else
                        :disabled="scopeInner.row.userId._id === currentUserId"
                        @click="handleSupport(scopeInner.row._id)">
                        点赞
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterEdit(scopeInner.row._id)">
                        <i class="el-icon-edit"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === currentUserId"
                        @click="handleRouterDelete(scopeInner.row._id)">
                        <i class="el-icon-delete"></i>
                    </button>
                    <!-- <span><i class="el-icon-star-off"></i></span>
                    <span><i class="el-icon-chat-dot-round"></i></span> -->
                </template>
            </article-list-item>
        </article-list>
        <article-tag
            :data="articleTagData"
            slot="tag">
            <template slot-scope="scope">
                <article-tag-item :item="scope.row"></article-tag-item>
            </template>
        </article-tag>
    </article-layout>
</template>

<script>
import { mapActions } from 'vuex';
import {
    ARTICLE_QUERY,
    ARTICLE_SUPPORT,
    TAG_QUERY
} from '@/store/mutation-types';

import ArticleLayout from './Layout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag/ArticleTag';
import ArticleTagItem from '@/components/common/articleTag/ArticleTagItem';
import scrollEvent from '@/mixins/scrollEvent';
import ArticleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';
import utils from '@/utils/utils';

export default {
    name: 'Home',
    components: {
        ArticleLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        ArticleTagItem
    },
    mixins: [ scrollEvent, ArticleCommon ],
    data() {
        return {
            articleData: [],
            articleTagData: [],
            pageConfig: {
                pageSize: 5,
                currentPage: 1,
                total: 0
            },
            isLoadMore: false, // 是否加载中,
            isLoadFinish: false // 是否加载完成
        };
    },
    computed: {
        tagName() {
            return this.$route.params.tagName;
        }
    },
    watch: {
        tagName: {
            handler(n, o) {
                this.pageConfig.currentPage = 1;
                this.articleData = [];
                this.getArticleList(n, 'load');
            },
            immediate: true
        }
    },
    created() {
        this.getArticleTag();
    },
    methods: {
        ...mapActions({
            articleQuery: ARTICLE_QUERY,
            tagQuery: TAG_QUERY,
            articleSupport: ARTICLE_SUPPORT
        }),
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList(this.tagName);
        },
        handleSupport(articleId) {
            this.articleSupport(articleId).then(() => {
                this.articleData.map((item) => {
                    if (item._id === articleId) {
                        item.isSupport = true;
                        item.supportCount++;
                    }
                });
            });
        },
        handleRouterDelete(articleId) {
            this.confirmDelete().then(() => {
                return api.articleDelete(articleId);
            }).then(() => {
                const index = utils.findIdIndex(this.articleData, articleId);
                this.articleData.splice(index, 1);
                this.showSuccessMsg('删除成功！');
            }).catch(() => {});
        },
        getArticleList(tagName, loadType = 'loadMore') {
            const params = {
                publish: true,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (tagName && tagName !== 'all') params.tagName = tagName;
            this.isLoadMore = true;
            this.articleQuery(params).then((res) => {
                this.pageConfig.total = res.total;
                this.isLoadMore = false;
                if (loadType === 'loadMore') {
                    this.articleData.push(...res.data);
                } else {
                    this.articleData = res.data;
                }
                if (this.articleData.length === res.total) this.isLoadFinish = true;
            });
        },
        getArticleTag() {
            this.tagQuery().then((res) => {
                if (res.data.length > 0) {
                    this.articleTagData.push({
                        name: 'all',
                        title: '全部'
                    });
                    this.articleTagData.push(...res.data);
                }
            });
        }
    }
};
</script>
