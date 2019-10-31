<template>
    <div class="topic-article__content-empty">
        <div><i class="icon icon-zhuanti"></i></div>
        <div>专题为空...</div>
        <div>你可以 <span @click="handleRoutePush('/write')">写一篇</span> 或者 <span @click="handleRoutePush('/')">去发现</span> 文章加入到专题中。</div>
    </div>
</template>

<script>
export default {
    name: '',
    methods: {
        handleRoutePush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
