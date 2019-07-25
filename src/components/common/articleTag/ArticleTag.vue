<template>
    <div class="article-tag">
        <div class="article-tag__title">
            <div class="tit">标签</div>
            <!-- <div
                class="more"
                @click="handleMore">
                管理
            </div> -->
        </div>
        <div class="article-tag__content">
            <template v-if="data.length > 0">
                <slot
                    v-for="item in data"
                    :row="item">
                </slot>
            </template>
            <template v-else>
                <div class="norecord">暂无数据！</div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleTag',
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    },
    methods: {
        handleMore() {
            this.$router.push({
                path: `/tag`
            });
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
