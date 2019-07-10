<template>
    <div class="tag-content-list-item">
        <div
            class="title"
            @click="handleArticle(tagId)">{{ name }}</div>
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
        name() {
            return this.item.name;
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
