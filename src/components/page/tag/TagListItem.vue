<template>
    <div class="tag-content-list-item">
        <div
            class="title"
            @click="handleArticle(tagId)">{{ title }}</div>
        <div class="follow">
            <span>关注</span>
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
        }
    },
    methods: {
        handleArticle(tagId) {
            this.$router.push({
                path: `/tag/${tagId}`
            });
        }
    }
};
</script>
