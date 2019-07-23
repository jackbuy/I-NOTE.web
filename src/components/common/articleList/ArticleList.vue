<template>
    <div class="article-list">
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
</template>

<script>
export default {
    name: 'ArticleList',
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>

<style lang="less">
.norecord{
    color: #666;
    font-size: 12px;
}
.article-list{
    &__item{
        padding: 20px;
        border: 1px solid #eee;
        margin-top: -1px;
        &:first-child{
            margin-top: 0;
        }
        &-header{
            font-size: 12px;
            color: #999;
            padding-bottom: 15px;
            span{
                margin-right: 10px;
            }
        }
        &-title{
            span{
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                line-height: 1.5;
                color: #333;
                transition: all 0.3s;
                &:hover{
                    color: #539eff;
                }
            }
        }
        &-action{
            padding-top: 20px;
            font-size: 0;
            span{
                display: inline-block;
                padding: 5px 10px;
                border: 1px solid #eee;
                font-size: 12px;
                color: #666;
                margin-right: 15px;
            }
        }
    }
}
</style>
