<template>
    <div class="layout__header-menu">
        <div
            v-for="list in data"
            :key="list.id"
            :class="{'active': list.name === activePath}"
            @click="handleRoute(list.url)">
            {{ list.title }}
            <span v-if="list.name === 'find' && isNewPost" class="new-msg"></span>
            <span v-if="list.name === 'msg' && isNewMsg" class="new-msg"></span>
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
        isNewMsg: Boolean,
        isNewPost: Boolean
    },
    computed: {
        activePath() {
            return this.$route.path.split('/')[1];
        }
    },
    methods: {
        handleRoute(url) {
            this.$emit('push', url);
        }
    }
};
</script>
