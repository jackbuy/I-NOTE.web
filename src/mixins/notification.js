/**
 * 桌面通知
 */

export default {
    methods: {
        checkNotification(callback) {
            // 是否支持Notification
            if (window.Notification) {
                /**
                 * Notification.permission 检查用户是否允许通知
                 * granted 用户通过
                 * denied 用户拒绝
                 * default 用户还没选择
                 */
                if (Notification.permission === 'granted') {
                    callback();
                } else {
                    // 再次询问用户是否允许通知
                    Notification.requestPermission().then((permission) => {
                        if (permission !== 'denied') {
                            callback();
                        }
                    });
                }
            }
        },
        sendNotification(options) {
            this.checkNotification(() => {
                this.notification(options);
            });
        },
        notification(options = {}) {
            const {
                title = 'I`NOTE 通知',
                body = '消息内容',
                icon = '../../static/img/inote_logo.jpg'
            } = options;
            const notification = new Notification(title, {
                body,
                icon
            });

            notification.click = () => {
                notification.close();
            };
        }
    }
};
