<template>
    <div
        class="author-hot"
        @click="handleZone(userId)">
        <div v-if="item.img" class="img" :style="{backgroundImage: 'url(' + img + ')'}"></div>
        <div v-else class="img">{{ img }}</div>
        <div class="title">{{ username }}</div>
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
        userId() {
            return this.item._id;
        },
        username() {
            return this.item.username;
        },
        img() {
            if (this.username) return this.username.split('')[0].toUpperCase();
        }
    },
    methods: {
        handleZone(userId) {
            this.$router.push(`/zone/${userId}/article`);
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
