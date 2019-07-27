<template>
    <article-list :data="articleData">
        <template slot-scope="scope">
            <article-list-item
                :item="scope.row">
            </article-list-item>
        </template>
    </article-list>
</template>

<script>
import { mapActions } from 'vuex';
import { ARTICLE_QUERY } from '@/store/mutation-types';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
export default {
    name: 'Search',
    components: {
        ArticleList,
        ArticleListItem
    },
    data() {
        return {
            articleData: []
        };
    },
    computed: {
        keyword() {
            return this.$route.params.keyword;
        }
    },
    watch: {
        keyword() {
            this.getArticleList(this.keyword);
        }
    },
    created() {
        this.getArticleList(this.keyword);
    },
    methods: {
        ...mapActions({
            articleQuery: ARTICLE_QUERY
        }),
        getArticleList(keyword) {
            const params = {
                publish: true,
                keyword
            };
            this.articleQuery(params).then((res) => {
                this.articleData = res.data;
            });
        }
    }
};
</script>
