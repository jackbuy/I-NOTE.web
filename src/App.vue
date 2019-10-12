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
            const title = this.$route.meta.title ? `${this.$route.meta.title}_` : '';
            return this.documentTitle ? `${this.documentTitle}_` : title;
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
            document.title = `${this.title}I'NOTE 创作者的社区`;
        }
    }
};
</script>

<style lang="less">
    @import './assets/less/global.less';

    /* 本地资源 */
    /* @import './assets/fonts/iconfont.css'; */
</style>
