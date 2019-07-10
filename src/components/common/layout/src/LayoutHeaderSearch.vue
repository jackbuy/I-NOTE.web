<template>
    <div class="layout__header-search">
        <form @submit.prevent="handleSearch">
            <input
                v-model.trim="keyword"
                type="text"
                placeholder="搜索">
        </form>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderSearch',
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        handleSearch() {
            this.$emit('search', this.keyword);
        }
    }
};
</script>
