<template>
    <page-loading :loading="loading" class="letter">
        <template v-show="userList && userList.length > 0">
            <div class="letter__side">
                <slot name="list"></slot>
            </div>
            <div class="letter__content">
                <slot name="content"></slot>
            </div>
        </template>
        <div v-show="!userList || userList.length === 0" class="no-has">暂无私信！</div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    components: {
        PageLoading
    },
    props: {
        loading: Boolean,
        userList: Array
    }
};
</script>
