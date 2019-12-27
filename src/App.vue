<template>
    <router-view v-if="isRenderApp"></router-view>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { GET_SYSTEM_INFO, GET_USER_INFO } from '@/store/mutation-types';
export default {
    name: 'App',
    data() {
        return {
            isRenderApp: false // 是否渲染app
        };
    },
    computed: {
        ...mapState({
            documentTitle: state => state.documentTitle,
            systemInfo: state => state.systemInfo
        }),
        ...mapGetters({
            isLogin: 'isLogin'
        }),
        title() {
            return this.documentTitle ? this.documentTitle : this.$route.meta.title || '';
        },
        systemName() {
            return this.systemInfo.name ? ` - ${this.systemInfo.name}` : '';
        },
        resultDocumentTitle() {
            return `${this.title}${this.systemName}`;
        }
    },
    watch: {
        title: {
            handler() {
                this.setDocumentTitle();
            }
            // immediate: true
        }
    },
    created() {
        this.getSystemInfo().then(() => {
            this.setDocumentTitle();
            this.isRenderApp = true;
        }).catch(() => {
            this.isRenderApp = false;
        });
        if (this.isLogin) {
            this.getUserInfo();
        }
    },
    methods: {
        ...mapActions({
            getSystemInfo: GET_SYSTEM_INFO,
            getUserInfo: GET_USER_INFO
        }),
        setDocumentTitle() {
            document.title = this.resultDocumentTitle;
        }
    }
};
</script>

<style lang="less">
    @import './assets/less/global.less';

    /* 本地资源 */
    @import './assets/fonts/iconfont.css';
</style>
