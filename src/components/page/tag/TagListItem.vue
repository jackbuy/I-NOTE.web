<template>
    <div class="tag-content-list-item">
        <div
            class="title"
            @click="handleArticle(tagId)">
            {{ title }}
        </div>
        <div class="count">{{ count }}</div>
        <div
            class="follow"
            @click="handleFollow(tagId)">
            <span v-if="isFollow" :class="{'active': isFollow}">已关注</span>
            <span v-else>关注</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TagList',
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
        tagId() {
            return this.item._id;
        },
        count() {
            return `${this.item.articleCount} 篇`;
        },
        isFollow() {
            return this.item.isFollow;
        }
    },
    methods: {
        handleArticle(tagId) {
            this.$router.push({
                path: `/tag/${tagId}`
            });
        },
        handleFollow(tagId) {
            this.$emit('doFollow', tagId);
        }
    }
};
</script>
