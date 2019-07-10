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

<style lang="less" scoped>
.breadcrumb{
    padding: 30px 0;
    span{
        margin-right: 10px;
        color: #666;
        font-size: 12px;
        vertical-align: bottom;
        &:first-child{
            font-size: 26px;
            font-weight: bold;
            color: #212121;
        }
    }
}
</style>
