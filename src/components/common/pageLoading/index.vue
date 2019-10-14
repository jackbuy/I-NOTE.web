<template>
    <div>
        <loading v-if='loading'></loading>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
import Loading from '_c/infiniteScrollList/src/Loading';
export default {
    name: 'PageLoading',
    components: {
        Loading
    },
    props: {
        loading: Boolean
    }
};
</script>
