<template>
    <article-layout>
        <article-list
            :data="articleData"
            slot="content">
            <template slot-scope="scope">
                <article-list-item :item="scope.row">
                    <template slot-scope="scopeInner">
                        <span
                            v-if="scopeInner.row.isSupport"
                            class="active">已赞</span>
                        <span
                            v-else
                            @click="handleSupport(scopeInner.row._id)">
                            点赞
                        </span>
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

export default {
    name: 'Home',
    components: {
        ArticleLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        ArticleTagItem
    },
    data() {
        return {
            articleData: [],
            articleTagData: []
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
                this.getArticleList(n);
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
        getArticleList(tagName) {
            const params = { publish: true };
            if (tagName && tagName !== 'all') params.tagName = tagName;
            this.articleQuery(params).then((res) => {
                this.articleData = res.data;
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
