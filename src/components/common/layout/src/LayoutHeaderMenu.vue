<template>
    <div class="layout__header-menu">
        <div
            v-for="list in data"
            :key="list.id"
            @click="handleRoute(list.url)">
            {{ list.title }}
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
        msgCount: Number
    },
    computed: {
        isNewMsg() {
            return this.msgCount > 0;
        }
    },
    methods: {
        handleRoute(url) {
            this.$emit('push', url);
        }
    }
};
</script>
