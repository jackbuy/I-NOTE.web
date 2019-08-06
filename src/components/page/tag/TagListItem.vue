<template>
    <div class="tag-content-list-item">
        <div
            class="title"
            @click="handleArticle(tagName)">{{ title }}</div>
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
        tagName() {
            return this.item.name;
        },
        tagId() {
            return this.item._id;
        },
        isFollow() {
            return this.item.isFollow;
        }
    },
    methods: {
        handleArticle(tagName) {
            this.$router.push({
                path: `/tag/${tagName}`
            });
        },
        handleFollow(tagId) {
            this.$emit('doFollow', tagId);
        }
    }
};
</script>
