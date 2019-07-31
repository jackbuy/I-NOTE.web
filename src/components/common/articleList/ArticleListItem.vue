<template>
    <div
        class="article-list__item"
        :class="{'has-img': img}">
        <div class="article-list__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ editTime }}</span>
            <span>{{ tag }}</span>
            <span v-if="supportCount > 0">赞：{{ supportCount }}次</span>
            <span v-if="viewCount > 0">阅读：{{ viewCount }}次</span>
        </div>
        <div class="article-list__item-title">
            <span @click="handleDetail(articleId)">{{ title }}</span>
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
            return this.item.userId.username;
        },
        title() {
            return this.item.title;
        },
        articleId() {
            return this.item._id;
        },
        createTime() {
            return `创建于 ${utils.formatDate.time(this.item.createTime)}`;
        },
        editTime() {
            return `${utils.formatDate.time(this.item.editTime)}`;
        },
        tag() {
            return this.item.tagName;
        },
        supportCount() {
            return this.item.supportCount || 0;
        },
        viewCount() {
            return this.item.viewCount || 0;
        },
        collect() {
            return this.item.collect;
        },
        img() {
            if (this.item.contentHtml) {
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
