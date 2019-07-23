<template>
    <div class="article-tag">
        <div class="article-tag__title">
            <div class="tit">标签</div>
            <div
                class="more"
                @click="handleMore">
                全部
            </div>
        </div>
        <div class="article-tag__content">
            <template v-if="data.length > 0">
                <slot
                    v-for="item in data"
                    :row="item">
                </slot>
            </template>
            <template v-else>
                <span class="norecord">暂无数据！</span>
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
    .article-tag{
        width: 100%;
        border: 1px solid #eee;
        &__title{
            padding: 15px;
            display: flex;
            border-bottom: 1px solid #eee;
            .tit{
                flex: 1;
            }
            .more{
                color: #539eff;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s;
                &:hover{
                    color: #539eff;
                }
            }
        }
        &__content{
            padding: 10px 20px;
            font-size: 0;
            &-item{
                display: inline-block;
                border-radius: 20px;
                border: 1px solid #eee;
                padding: 5px 10px;
                font-size: 13px;
                margin: 5px 0;
                margin-right: 10px;
                cursor: pointer;
                transition: all 0.3s;
                &:hover{
                    color: #539eff;
                    border-color: #539eff;
                }
            }
        }
    }
</style>
