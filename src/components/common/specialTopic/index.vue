<template>
    <div
        class="special-topic"
        @click="handleRouterPush(id)">
        <div class="img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: 'ArticleTagItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        id(id) {
            return this.item._id;
        },
        title() {
            return this.item.title;
        },
        img() {
            return this.item.img;
        }
    },
    methods: {
        handleRouterPush(id) {
            this.$router.push({
                path: `/topic/${id}`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
