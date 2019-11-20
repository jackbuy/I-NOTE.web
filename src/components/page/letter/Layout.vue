<template>
    <page-loading :loading="loading" class="letter">
        <div class="letter__side">
            <slot name="list"></slot>
        </div>
        <div class="letter__content">
            <slot name="content"></slot>
        </div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    components: {
        PageLoading
    },
    props: {
        loading: Boolean
    }
};
</script>
