<template>
    <article-list
        :data="data"
        slot="content">
        <template slot-scope="scope">
            <article-list-item :item="scope.row"></article-list-item>
        </template>
    </article-list>
</template>

<script>
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import api from '@/utils/api';
export default {
    name: 'ZoneArticleList',
    props: {
        type: String
    },
    components: {
        ArticleList,
        ArticleListItem
    },
    data() {
        return {
            data: []
        };
    },
    computed: {
        articleType() {
            return this.$route.params.articleType;
        }
    },
    watch: {
        articleType: {
            handler(n, o) {
                this.getArticleList(n);
            },
            immediate: true
        }
    },
    methods: {
        getArticleList(type) {
            const params = { publish: true };
            if (type === 'draft') params.publish = false;
            api.zoneArticleQuery(params).then((res) => {
                this.data = res.data;
            });
        }
    }
};
</script>
