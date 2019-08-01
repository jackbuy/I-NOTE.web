<template>
    <div
        class="special-topic"
        :class="{'active': tagName === activeTagName}"
        @click="handleArticle(tagName)">
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
        title() {
            return this.item.title;
        },
        img() {
            return this.item.img;
        },
        tagName() {
            return this.item.name;
        },
        activeTagName() {
            return this.$route.params.tagName || 'all';
        }
    },
    methods: {
        handleArticle(tagName) {
            this.$router.push({
                path: `/article/${tagName}`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
