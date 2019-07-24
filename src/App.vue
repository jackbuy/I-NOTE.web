<template>
    <router-view></router-view>
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
            if (this.$route.meta.title) document.title = `${this.$route.meta.title}_I'NOTE`;
        }
    }
};
</script>

<style lang="less">
    @import './assets/fonts/iconfont.css';
    @import './assets/less/global.less';
</style>
