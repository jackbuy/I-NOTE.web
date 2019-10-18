<template>
    <div>
        <loading v-if='loading'></loading>
        <template v-else>
            <empty-data v-if='data && data.length === 0'></empty-data>
            <slot v-else></slot>
        </template>
    </div>
</template>

<script>
import EmptyData from '_c/infiniteScrollList/src/EmptyData';
import Loading from '_c/infiniteScrollList/src/Loading';
export default {
    name: 'PageLoading',
    components: {
        Loading,
        EmptyData
    },
    props: {
        loading: Boolean,
        data: Array
    }
};
</script>
