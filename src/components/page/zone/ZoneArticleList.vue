<template>
    <article-list
        :data="data"
        slot="content">
        <template slot-scope="scope">
            <article-list-item :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        v-if="scopeInner.row.userId._id === userId"
                        @click="handleEdit(scopeInner.row)">
                        <i class="el-icon-edit"></i>
                    </button>
                    <button
                        v-if="scopeInner.row.userId._id === userId"
                        @click="handleDelete(scopeInner.row)">
                        <i class="el-icon-delete"></i>
                    </button>
                </template>
            </article-list-item>
        </template>
    </article-list>
</template>

<script>
import { mapActions } from 'vuex';
import {
    ARTICLE_QUERY
} from '@/store/mutation-types';

import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import message from '@/mixins/message';
import api from '@/utils/api';
export default {
    name: 'ZoneArticleList',
    mixins: [ message ],
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
        },
        userId() {
            return localStorage.getItem('userId');
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
        ...mapActions({
            articleQuery: ARTICLE_QUERY
        }),
        getArticleList(type) {
            const params = {
                publish: true,
                mine: true
            };
            if (type === 'draft') params.publish = false;
            this.articleQuery(params).then((res) => {
                this.data = res.data;
            });
        },
        handleEdit(row) {
            const { _id } = row;
            this.$router.push(`/write/${_id}`);
        },
        handleDelete(row) {
            const { _id } = row;
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.articleDelete(_id).then(() => {
                    this.showSuccessMsg('删除成功！');
                    this.getArticleList(this.articleType);
                });
            }).catch(() => {});
        }
    }
};
</script>
