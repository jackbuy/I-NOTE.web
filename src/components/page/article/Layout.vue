<template>
    <div class="home">
        <div class="home-content">
            <slot name="content"></slot>
        </div>
        <div class="home-side">
            <slot name="tag"></slot>
        </div>
    </div>
</template>

<style lang="less">
    .home{
        display: flex;
        &-content{
            flex: 1;
        }
        &-side{
            width: 30%;
            padding-left: 15px;
        }
    }
</style>
