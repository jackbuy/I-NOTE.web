<template>
    <router-view></router-view>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapState({
            documentTitle: state => state.documentTitle
        }),
        title() {
            return this.documentTitle ? this.documentTitle : this.$route.meta.title;
        }
    },
    watch: {
        title: {
            handler() {
                this.setDocumentTitle();
            },
            immediate: true
        }
    },
    methods: {
        setDocumentTitle() {
            document.title = `${this.title}_I'NOTE`;
        }
    }
};
</script>

<style lang="less">
    @import './assets/fonts/iconfont.css';
    @import './assets/less/global.less';
</style>
