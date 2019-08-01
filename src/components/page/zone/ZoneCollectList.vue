<template>
    <article-list
        :data="data"
        slot="content">
        <template slot-scope="scope">
            <article-list-item :item="scope.row">
                <template slot-scope="scopeInner">
                    <button
                        @click="handleDelete(scopeInner.row)">
                        <i class="el-icon-delete"></i>
                    </button>
                </template>
            </article-list-item>
        </template>
    </article-list>
</template>

<script>
import ArticleList from '@/components/common/articleList/ArticleList';
import ArticleListItem from '@/components/common/articleList/ArticleListItem';
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneCollectList',
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
    watch: {
        type: {
            handler(n, o) {
                this.getCollectList(n);
            },
            immediate: true
        }
    },
    methods: {
        getCollectList(type) {
            api.collectQuery().then((res) => {
                this.data = res.data.map(item => item.articleId);
            });
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
