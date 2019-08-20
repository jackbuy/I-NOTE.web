<template>
    <div
        class="topic__item"
        :class="{'has-img': img}">
        <div class="topic__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ createTime }}</span>
        </div>
        <div class="topic__item-title">
            <span @click="handleRouterPush(topicId)">{{ title }}</span>
        </div>
        <div v-if="description" class="topic__item-description">
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
            if (this.item && this.item.userId) return this.item.userId.username;
        },
        title() {
            if (this.item && this.item.title) {
                return this.item.title;
            } else {
                return '无标题';
            }
        },
        topicId() {
            if (this.item) return this.item._id || '';
        },
        createTime() {
            if (this.item) return `${utils.formatDate.time(this.item.createTime)}`;
        },
        img() {
            return this.item.img ? this.item.img : '';
        },
        description() {
            return this.item.description ? this.item.description : '';
        }
    },
    methods: {
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
