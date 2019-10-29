<template>
    <div class="layout__header-menu">
        <div
            v-for="list in data"
            :key="list.id"
            :class="{'active': list.name === isActive}"
            @click="handleRoute(list.url)">
            {{ list.title }}
            <span v-if="list.name === 'find' && isNewPost" class="new-msg"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderMenu',
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        isNewPost: Boolean,
        isActive: String
    },
    methods: {
        handleRoute(url) {
            this.$emit('push', url);
        }
    }
};
</script>
