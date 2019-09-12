<template>
    <div
        class="topic__item"
        :class="{'has-img': img}">
        <div class="topic__item-header">
            <span>{{ username }}</span>
            <span>{{ createTime }}</span>
        </div>
        <div class="topic__item-title" @click="handleRouterPush(topicId)">
            {{ title }}
        </div>
        <div class="topic__item-description">
            {{ description }}
        </div>
        <div class="topic__item-action">
            <slot :row="item"></slot>
        </div>
        <div class="topic__item-img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'TopicItem',
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
                return '未命名专题';
            }
        },
        topicId() {
            if (this.item) return this.item._id || '';
        },
        createTime() {
            if (this.item) {
                let end = utils.formatDate.time(this.item.createTime);
                let start = utils.formatDate.now();
                return utils.diffDate(start, end);
            }
        },
        img() {
            return this.item.img ? `${imgBaseUrl}/${this.item.img}` : '';
        },
        description() {
            return this.item.description ? this.item.description : '';
        }
    },
    methods: {
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path }).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
