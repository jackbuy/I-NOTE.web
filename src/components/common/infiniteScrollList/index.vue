<template>
    <div class="infinite-scroll-list">
        <template v-if="data.length > 0">
            <slot
                v-for="item in data"
                :row="item">
            </slot>
        </template>
        <loading v-if='loading'></loading>
        <empty-data v-if="data.length === 0 && noMore && !loading"></empty-data>
        <no-more-data v-if='data.length > 0 && noMore && !loading'></no-more-data>
    </div>
</template>

<script>
import Loading from './src/Loading';
import NoMoreData from './src/NoMoreData';
import EmptyData from './src/EmptyData';
export default {
    name: 'infiniteScrollList',
    components: {
        Loading,
        NoMoreData,
        EmptyData
    },
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
    data() {
        return {
            i: 0
        };
    },
    mounted() {
        window.onscroll = () => {
            // 判断页面滚动方向
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if (scroll < 0) {
                this.$emit('up');
            } else {
                this.$emit('down');
            }

            // 当滚动条滑动，触发事件，判断是否到达最底部
            if (this.getScrollHeight() === this.getWindowHeight() + this.getDocumentTop()) {
                if (!this.noMore && !this.loading) this.$emit('loadData');
            }
            // emit滚动事件
            this.$emit('scroll', scrollTop);
        };
    },
    activated() {
        window.onscroll = () => {
            // 判断页面滚动方向
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scroll = scrollTop - this.i;
            this.i = scrollTop;
            if (scroll < 0) {
                this.$emit('up');
            } else {
                this.$emit('down');
            }

            // 当滚动条滑动，触发事件，判断是否到达最底部
            if (this.getScrollHeight() === this.getWindowHeight() + this.getDocumentTop()) {
                if (!this.noMore && !this.loading) this.$emit('loadData');
            }

            // emit滚动事件
            this.$emit('scroll', scrollTop);
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
