<template>
    <article-layout>
        <article-list
            :data="articleData"
            slot="content">
            <template slot-scope="scope">
                <article-list-item :item="scope.row">
                    <template slot-scope="scopeInner">
                        <button
                            v-if="scopeInner.row.isSupport"
                            class="active">已赞</button>
                        <button
                            v-else
                            :disabled="scopeInner.row.userId._id === mine"
                            @click="handleSupport(scopeInner.row._id)">
                            点赞
                        </button>
                        <!-- <span><i class="el-icon-star-off"></i></span>
                        <span><i class="el-icon-chat-dot-round"></i></span> -->
                    </template>
                </article-list-item>
            </template>
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

export default {
    name: 'Home',
    components: {
        ArticleLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        ArticleTagItem
    },
    mixins: [ scrollEvent ],
    data() {
        return {
            articleData: [],
            articleTagData: [],
            pageConfig: {
                pageSize: 5,
                currentPage: 1,
                total: 0
            },
            isLoadMore: false // 是否加载更多
        };
    },
    computed: {
        tagName() {
            return this.$route.params.tagName;
        },
        mine() {
            return localStorage.getItem('userId');
        }
    },
    watch: {
        tagName: {
            handler(n, o) {
                this.pageConfig.currentPage = 1;
                this.isLoadMore = true;
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
            if (this.isLoadMore) this.getArticleList(this.tagName);
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
        getArticleList(tagName, loadType = 'loadMore') {
            const params = {
                publish: true,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            if (tagName && tagName !== 'all') params.tagName = tagName;
            this.articleQuery(params).then((res) => {
                this.pageConfig.total = res.total;
                if (loadType === 'loadMore') {
                    this.articleData.push(...res.data);
                } else {
                    this.articleData = res.data;
                }
                if (this.articleData.length === res.total) this.isLoadMore = false; // 加载完成
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
