<template>
    <router-view/>
</template>

<script>
export default {
    name: 'App',
    created() {
        this.setDocumentTitle();
    },
    watch: {
        $route() {
            this.setDocumentTitle();
        }
    },
    methods: {
        setDocumentTitle() {
            if (this.$route.meta.title) document.title = `I'NOTE_${this.$route.meta.title}`;
        }
    }
};
</script>

<style lang="less">
    @import './assets/fonts/iconfont.css';
    @import './assets/less/global.less';
    @import './assets/less/theme.less';
</style>
