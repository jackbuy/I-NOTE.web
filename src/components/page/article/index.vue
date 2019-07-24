<template>
    <article-layout>
        <article-list
            :data="articleData"
            slot="content">
            <template slot-scope="scope">
                <article-list-item :item="scope.row"></article-list-item>
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
import ArticleLayout from './Layout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag/ArticleTag';
import ArticleTagItem from '@/components/common/articleTag/ArticleTagItem';
import api from '@/utils/api';
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
            // deep: true, // 深度监听
            immediate: true // 立即执行
        }
    },
    created() {
        this.getArticleTag();
    },
    methods: {
        getArticleList(tagName) {
            const params = { publish: true };
            if (tagName) params.tagName = tagName;
            api.articleQuery(params).then((res) => {
                this.articleData = res.data;
            });
        },
        getArticleTag() {
            api.tagQuery().then((res) => {
                this.articleTagData = res.data;
            });
        }
    }
};
</script>
