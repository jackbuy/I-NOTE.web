<template>
    <home-layout>
        <article-list slot="content">
            <article-list-item
                v-for="item in articleData"
                :key="item._id"
                :item="item">
            </article-list-item>
        </article-list>
        <article-tag slot="tag">
            <article-tag-item
                v-for="item in articleTagData"
                :key="item._id"
                :item="item">
            </article-tag-item>
        </article-tag>
    </home-layout>
</template>

<script>
import HomeLayout from './HomeLayout';
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import ArticleTag from '@/components/common/articleTag/ArticleTag';
import ArticleTagItem from '@/components/common/articleTag/ArticleTagItem';
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
                    title: '小程序开发者，为什么你应该尝试下MPX',
                    tag: '微信小程序',
                    articleId: '123',
                    updateTime: '123445566',
                    support: 12,
                    collect: 234
                },
                {
                    _id: 2,
                    username: 'sky-admin',
                    title: 'Node 中的日志收集与 requestId',
                    tag: '微信小程序',
                    articleId: '123',
                    support: 12,
                    collect: 234,
                    updateTime: '123445566'
                },
                {
                    _id: 3,
                    username: 'sky-admin',
                    title: '小程序开发者，为什么你应该尝试下MPX',
                    tag: '微信小程序',
                    articleId: '123',
                    support: 12,
                    collect: 234,
                    updateTime: '123445566'
                },
                {
                    _id: 9,
                    username: 'sky-admin',
                    title: 'Node 中的日志收集与 requestId',
                    tag: '微信小程序',
                    articleId: '123',
                    support: 12,
                    collect: 234,
                    updateTime: '123445566'
                },
                {
                    _id: 8,
                    username: 'sky-admin',
                    title: '小程序开发者，为什么你应该尝试下MPX',
                    tag: '微信小程序',
                    articleId: '123',
                    support: 12,
                    collect: 234,
                    updateTime: '123445566'
                },
                {
                    _id: 13,
                    username: 'sky-admin',
                    title: 'Node 中的日志收集与 requestId',
                    tag: '微信小程序',
                    articleId: '123',
                    support: 12,
                    collect: 234,
                    updateTime: '123445566'
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
    methods: {
    }
};
</script>
