// /*
// 当滚动条滑动，触发事件，判断是否到达最底部
// 然后调用ajax处理函数异步加载数据
// */
// window.onscroll = function () {
//     //监听事件内容
//     if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
//         //当滚动条到底时,这里是触发内容
//         //异步请求数据,局部刷新dom
//         ajax_function();
//     }
// }

export default {
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
