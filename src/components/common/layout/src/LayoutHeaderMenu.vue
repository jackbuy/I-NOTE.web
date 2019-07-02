<template>
    <div class="layout__header-menu">
        <div
            v-for="list in data"
            :key="list.id"
            @click="handleRoute(list.url)">
            {{ list.title }}
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
        }
    },
    methods: {
        handleRoute(url) {
            console.log(url);
        }
    }
};
</script>
