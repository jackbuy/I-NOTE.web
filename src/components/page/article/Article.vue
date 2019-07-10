<template>
    <article-list>
        <article-list-item
            v-for="item in articleData"
            :key="item._id"
            :item="item">
        </article-list-item>
    </article-list>
</template>

<script>
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
export default {
    name: 'Article',
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
            ]
        };
    }
};
</script>
