<template>
    <div class="container">
        <template v-if="!loading">
            <template v-if="isNotFind">
                <div class="not-find">{{ tips }}</div>
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </template>
        <template v-else>
            <div class="loading-tip"><i class="el-icon-loading"></i> 加载中...</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Container',
    props: {
        isNotFind: Boolean,
        loading: Boolean,
        tips: String
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
