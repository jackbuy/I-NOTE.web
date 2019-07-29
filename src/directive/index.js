/**
 * 代码高亮
 */
import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre');
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
});
