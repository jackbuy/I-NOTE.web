/**
 * 全屏
 */

export default {
    data() {
        return {
            fullscreen: false
        };
    },
    mounted() {
        // let _this = this;
        // window.onresize = () => {
        //     // 全屏下监听是否按下了ESC键
        //     if (!_this.checkFull()) {
        //         // 要执行的动作
        //         _this.fullscreen = false;
        //         console.log(2);
        //     }
        // };
        window.addEventListener('resize', () => {
            // 全屏下监听是否按下了ESC键
            if (!this.checkFull()) {
                // 要执行的动作
                this.fullscreen = false;
            }
        });
    },
    methods: {
        checkFull() {
            var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if (isFull === undefined) isFull = false;
            return isFull;
        },
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    }
};
