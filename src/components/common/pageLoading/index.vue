<template>
    <div>
        <loading v-if='loading'></loading>
        <empty-data v-if='!loading && data.length === 0'></empty-data>
        <template v-else>
            <slot></slot>
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
