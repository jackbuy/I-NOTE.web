<template>
    <div class="topic-article__content-empty">
        <div><i class="icon icon-zhuanti"></i></div>
        <div>专题为空</div>
        <div v-if="isMine">您可以 <span @click="handleRoutePush('/write')">写文章</span> 并发布，然后就可以把发布的文章收入专题啦~</div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        isMine: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleRoutePush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
