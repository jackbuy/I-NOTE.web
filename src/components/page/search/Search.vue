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
            articleData: [
                {
                    _id: 1,
                    username: 'sky-admin',
                    title: '小程序开发者，为什么你应该尝试下MPX',
                    tag: '微信小程序',
                    articleId: '123',
                    updateTime: '123445566',
                    support: 12,
                    collect: 234
                }
            ]
        };
    },
    computed: {
        keyword() {
            return this.$route.params.keyword;
        }
    }
};
</script>
