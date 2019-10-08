<template>
    <div
        class="article__item"
        :class="{'has-img': img}">
        <div class="article__item-menu">
            <button v-if="showMenuEdit" @click="handleEdit(itemId)"><i class="el-icon-edit"></i></button>
            <button v-if="showMenuDelete" @click="handleDelete(itemId)"><i class="el-icon-delete"></i></button>
        </div>
        <div v-if="item" class="article__item-header">
            <div class="img" :style="{backgroundImage: 'url(' + userImg + ')'}"></div>
            <div class="name">{{ username }}</div>
            <div class="time">{{ time }}</div>
            <!-- <span v-if="isTop" class="article-top">置顶</span> -->
        </div>
        <div class="article__item-title">
            <span @click="handleDetail(articleId)">{{ title }}</span>
        </div>
        <div class="article__item-description">
            {{ description }}
        </div>
        <div v-if="itemType !== 'draft'" class="article__item-action">
            <span>
                <i class="icon icon-dianzan"></i>
                {{ likeCount }}
            </span>
            <span>
                <i class="icon icon-like"></i>
                {{ collectCount }}
            </span>
            <span>
                <i class="icon icon-pinglun"></i>
                {{ commentCount }}
            </span>
            <span>
                <i class="icon icon-chakan1"></i>
                {{ viewCount }}
            </span>
            <span>
                <i class="icon icon-bq"></i>
                {{ tag }}
            </span>
        </div>
        <div class="article__item-img" v-if="img" v-html="img"></div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
import utils from '@/utils/utils';
export default {
    name: 'ArticleListItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        itemId: String,
        itemType: String,
        showMenuEdit: {
            type: Boolean,
            default: true
        },
        showMenuDelete: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        username() {
            if (this.item && this.item.userId) return this.item.userId.nickname ? this.item.userId.nickname : this.item.userId.username;
        },
        userImg() {
            if (this.item && this.item.userId) return this.item.userId && this.item.userId.avatar ? `${imgBaseUrl}/${this.item.userId.avatar}` : '';
        },
        title() {
            if (this.item && this.item.title) {
                return this.item.title;
            } else {
                return '无标题';
            }
        },
        description() {
            if (this.item && this.item.contentText) return this.item.contentText;
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
        time() {
            if (this.item && this.item.title) {
                let time = this.item && this.item.editTime ? this.item.editTime : this.item.createTime;
                let end = utils.formatDate.time(time);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        tag() {
            if (this.item && this.item.tagId) return this.item.tagId.title;
        },
        viewCount() {
            if (this.item) return this.item.viewCount > 0 ? this.item.viewCount : '';
        },
        likeCount() {
            if (this.item) return this.item.likeCount > 0 ? this.item.likeCount : '';
        },
        collectCount() {
            if (this.item) return this.item.collectCount > 0 ? this.item.collectCount : '';
        },
        commentCount() {
            if (this.item) return this.item.commentCount > 0 ? this.item.commentCount : '';
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
            let path = this.itemType === 'draft' ? `/write/${articleId}` : `/detail/${articleId}`;
            this.$router.push(path).catch(() => {});
        },
        handleEdit(itemId) {
            this.$emit('edit', itemId);
        },
        handleDelete(itemId) {
            this.$emit('delete', itemId);
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
