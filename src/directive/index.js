
import Vue from 'vue';
import Hljs from 'highlight.js';

// 先有数据再绑定，调用highlightA
Vue.directive('highlightA', {
    inserted: function(el) {
        let blocks = el.querySelectorAll('pre');
        for (let i = 0; i < blocks.length; i++) {
            const item = blocks[i];
            Hljs.highlightBlock(item);
        };
    }
});

// 先绑定，后面会有数据更新，调用highlightB
Vue.directive('highlightB', {
    componentUpdated: function(el) {
        let blocks = el.querySelectorAll('pre');
        for (let i = 0; i < blocks.length; i++) {
            const item = blocks[i];
            Hljs.highlightBlock(item);
        };
    }
});

// 无限滚动
Vue.directive('infinite', (ele, binding, vnode) => {
    ele.onscroll = () => {
        if (!vnode.context.noMore) {
            if (ele.scrollHeight === ele.scrollTop + ele.clientHeight) {
                binding.value();
            }
        }
    };
});
