<template>
    <div>
        <p>{{ keyword }}</p>
    </div>
</template>

<script>
export default {
    name: 'Search',
    computed: {
        keyword() {
            return this.$route.params.keyword;
        }
    }
};
</script>
