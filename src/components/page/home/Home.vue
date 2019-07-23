<template>
    <home-layout>
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
    </home-layout>
</template>

<script>
import HomeLayout from './HomeLayout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag/ArticleTag';
import ArticleTagItem from '@/components/common/articleTag/ArticleTagItem';
import api from '@/utils/api';
export default {
    name: 'Home',
    components: {
        HomeLayout,
        ArticleList,
        ArticleListItem,
        ArticleTag,
        ArticleTagItem
    },
    data() {
        return {
            articleData: [
                {
                    _id: 1,
                    username: 'sky-admin',
                    title: '小程序开发者，为什么你应该尝试下MPX小程序开发者，为什么你应该尝试下MPX',
                    tag: '微信小程序',
                    articleId: '123',
                    updateTime: '123445566',
                    support: 12,
                    collect: 234
                }
            ],
            articleTagData: [
                {
                    _id: 1,
                    name: '微信小程序'
                },
                {
                    _id: 2,
                    name: 'nodejs'
                },
                {
                    _id: 3,
                    name: '前端'
                },
                {
                    _id: 4,
                    name: '面试'
                },
                {
                    _id: 5,
                    name: '算法'
                }
            ]
        };
    },
    created() {
        this.getArticleList();
    },
    methods: {
        getArticleList() {
            api.articleQuery().then((res) => {
                this.articleData = res.data;
            });
        }
    }
};
</script>
