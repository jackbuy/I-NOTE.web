<template>
    <div
        class="article__item"
        :class="{'has-img': img}">
        <div class="article__item-header">
            <span v-if="isTop" class="article-top">置顶</span>
            <span>{{ username }}</span>
            <span>{{ editTime }}</span>
            <span v-if="publish">{{ tag }}</span>
            <span v-if="publish && viewCount > 0">浏览 {{ viewCount }}</span>
        </div>
        <div class="article__item-title">
            <span @click="handleDetail(articleId)">{{ title }}</span>
        </div>
        <div class="article__item-action">
            <slot :row="item"></slot>
        </div>
        <div class="article__item-img" v-if="img" v-html="img"></div>
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
            if (this.item && this.item.userId) return this.item.userId.nickname ? this.item.userId.nickname : this.item.userId.username;
        },
        title() {
            if (this.item && this.item.title) {
                return this.item.title;
            } else {
                return '无标题';
            }
        },
        isTop() {
            if (this.item) return this.item.top;
        },
        publish() {
            if (this.item) return this.item.publish;
        },
        articleId() {
            if (this.item) return this.item._id || '';
        },
        editTime() {
            if (this.item) {
                let end = utils.formatDate.time(this.item.editTime);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        tag() {
            if (this.item && this.item.tagId) return this.item.tagId.title;
        },
        viewCount() {
            if (this.item) return this.item.viewCount || 0;
        },
        img() {
            return '';
            // if (this.item && this.item.contentHtml) {
            //     // 匹配图片（g表示匹配所有结果i表示区分大小写）
            //     var imgReg = /<img.*?(?:>|\/>)/gi;
            //     var arr = this.item.contentHtml.match(imgReg);
            //     if (arr && arr.length > 0) return arr[0];
            // }
        }
    },
    methods: {
        handleDetail(articleId) {
            let path = this.publish ? `/detail/${articleId}` : `/write/${articleId}`;
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
