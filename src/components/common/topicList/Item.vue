<template>
    <div
        class="topic-list__item"
        :class="{'has-img': img}">
        <div class="topic-list__item-header">
            <span>{{ username }}</span>
            <span :title="createTime">{{ createTime }}</span>
        </div>
        <div class="topic-list__item-title">
            <span @click="handleRouterPush(topicId)">{{ title }}</span>
        </div>
        <div class="topic-list__item-action">
            <slot :row="item"></slot>
        </div>
        <div class="topic-list__item-img" v-if="img" v-html="img"></div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
export default {
    name: 'TopicListItem',
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
        handleRouterPush(topicId) {
            let path = `/topic/${topicId}`;
            this.$router.push({ path });
        }
    }
};
</script>
