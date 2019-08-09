<template>
    <div
        class="article-list__item"
        :class="{'has-img': img}">
        <div class="article-list__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ editTime }}</span>
            <span>{{ tag }}</span>
            <span v-if="viewCount > 0">浏览 {{ viewCount }}</span>
        </div>
        <div class="article-list__item-title">
            <span v-if="title" @click="handleDetail(articleId)">{{ title }}</span>
            <del v-else style="color: #ccc;">文章已被作者删除</del>
        </div>
        <div class="article-list__item-action">
            <slot :row="item"></slot>
        </div>
        <div class="article-list__item-img" v-if="img" v-html="img"></div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
export default {
    name: 'ArticleListItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        username() {
            if (this.item && this.item.userId) return this.item.userId.username;
        },
        title() {
            if (this.item) return this.item.title;
        },
        articleId() {
            if (this.item) return this.item._id || '';
        },
        createTime() {
            if (this.item) return `创建于 ${utils.formatDate.time(this.item.createTime)}`;
        },
        editTime() {
            if (this.item) return `${utils.formatDate.time(this.item.editTime)}`;
        },
        tag() {
            if (this.item && this.item.tagId) return this.item.tagId.title;
        },
        viewCount() {
            if (this.item) return this.item.viewCount || 0;
        },
        img() {
            if (this.item && this.item.contentHtml) {
                // 匹配图片（g表示匹配所有结果i表示区分大小写）
                var imgReg = /<img.*?(?:>|\/>)/gi;
                var arr = this.item.contentHtml.match(imgReg);
                if (arr && arr.length > 0) return arr[0];
            }
        }
    },
    methods: {
        handleDetail(articleId) {
            this.$router.push({
                path: `/detail/${articleId}`
            });
        }
    }
};
</script>
