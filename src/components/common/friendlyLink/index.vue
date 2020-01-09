<template>
    <div class="friendly-link">
        <div
            v-for="item in data"
            :key="item._id"
            :title="item.description"
            class="friendly-link__item"
            @click="handleUrl(item.url)">{{ item.title }}</div>
    </div>
</template>

<script>
export default {
    name: 'FriendlyLink',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleUrl(url) {
            window.open(url);
        }
    }
};
</script>
