<template>
    <div class="tag">
        <div class="tag-content">
            <slot name="list"></slot>
        </div>
        <div class="tag-side">
            <slot name="search"></slot>
        </div>
    </div>
</template>

<style lang="less">
    .tag{
        display: flex;
        &-content{
            flex: 1;
            &-list{
                display: flex;
                flex-wrap: wrap;
                justify-content: left;
                &-item{
                    flex: 0 0 24%;
                    margin: 0.5%;
                    padding: 30px 10px;
                    border: 1px solid #eee;
                    text-align: center;
                    .title{
                        font-size: 14px;
                        padding-bottom: 30px;
                        cursor: pointer;
                    }
                    .follow{
                        text-align: center;
                        span{
                            padding: 6px 12px;
                            border: 1px solid #eee;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.3s;
                            &:hover{
                                color: #539eff;
                                border-color: #539eff;
                            }
                        }
                    }
                }
            }
        }
        &-side{
            width: 0%;
            padding-left: 0px;
        }
    }
</style>
