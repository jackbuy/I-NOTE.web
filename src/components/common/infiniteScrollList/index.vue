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
        document.body.onscroll = () => {
            this.pageScroll();
        };
    },
    activated() {
        document.body.onscroll = () => {
            this.pageScroll();
        };
    },
    methods: {
        pageScroll() {
            // 当滚动条滑动，触发事件，判断是否到达最底部
            if (this.getScrollHeight() === this.getClientHeight() + this.getScrollTop()) {
                if (!this.noMore && !this.loading) this.$emit('loadData');
            }

            // 判断页面滚动方向
            var scroll = this.getScrollTop() - this.i;
            this.i = this.getScrollTop();
            if (scroll < 0) {
                this.$emit('up');
            } else {
                this.$emit('down');
            }

            // emit滚动事件
            // this.$emit('scroll', scrollTop);
        },
        getScrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        getClientHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        getScrollHeight() {
            return document.documentElement.scrollHeight || document.body.scrollHeight;
        }
    }
};
</script>
