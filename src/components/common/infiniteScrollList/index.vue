<template>
    <div class="infinite-scroll-list">
        <template v-if="data.length > 0">
            <slot
                v-for="item in data"
                :row="item">
            </slot>
        </template>
        <template v-if="data.length === 0 && noMore && !loading">
            <div class="norecord">暂无数据！</div>
        </template>
        <div v-if='loading' class="loading-tip">加载中...</div>
        <div v-if='data.length > 0 && noMore && !loading' class="loading-tip">~ 我是有底线的 ~</div>
    </div>
</template>

<script>
export default {
    name: 'infiniteScrollList',
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        loading: {
            type: Boolean,
            default: false
        },
        noMore: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // 当滚动条滑动，触发事件，判断是否到达最底部
        window.onscroll = () => {
            if (this.getScrollHeight() === this.getWindowHeight() + this.getDocumentTop()) {
                if (!this.noMore && !this.loading) this.$emit('loadData');
            }
        };
    },
    methods: {
        // 文档高度
        getDocumentTop() {
            let scrollTop = 0;
            let bodyScrollTop = 0;
            let documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        },
        // 可视窗口高度
        getWindowHeight() {
            // let windowHeight = 0;
            // if (document.compatMode === 'CS1SCompat') {
            //     windowHeight = document.documentElement.clientHeight;
            // } else {
            //     windowHeight = document.body.clientHeight;
            // }
            // return windowHeight;
            return window.innerHeight;
        },
        // 滚动条滚动高度
        getScrollHeight() {
            let scrollHeight = 0;
            let bodyScrollHeight = 0;
            let documentScrollHeight = 0;
            if (document.body) {
                bodyScrollHeight = document.body.scrollHeight;
            }
            if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        }
    }
};
</script>

<style lang="less">
@import './index.less';
</style>
