<template>
    <div class="breadcrumb">
        <span
            v-for="breadcrumb in breadcrumbList"
            :key="breadcrumb">
            {{breadcrumb}}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    computed: {
        breadcrumbList() {
            return this.$route.meta.title.split('-');
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
