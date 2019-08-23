import moment from 'moment';
import 'moment/locale/zh-cn';

function fn(data, pid) {
    let result = [];
    let temp;
    for (var i in data) {
        if (data[i].parentId === pid) {
            result.push(data[i]);
            temp = fn(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}

export default {
    getQueryStringByName: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        var context = '';
        if (r != null) {
            context = r[2];
            reg = null;
            r = null;
            return context == null || context === '' || context === 'undefined' ? '' : context;
        }
    },
    getUUID() {
        let s = [];
        let hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';

        let uuid = s.join('');
        return uuid;
    },
    arrayToIndex: (arr, id) => {
        let _index;
        arr.map((ele, index) => {
            if (ele.id === id) {
                _index = index;
            }
        });
        return _index;
    },
    arrayToString: (arr) => {
        let str = '';
        arr.map((ele, index) => {
            if (index === 0) {
                str += ele;
            } else {
                str += ',' + ele;
            }
        });
        return str;
    },
    formatDate: {
        date(now) {
            return moment(now).format('YYYY-MM-DD');
        },
        time(now) {
            return moment(now).format('YYYY-MM-DD HH:mm:ss');
        },
        format(now) {
            return moment(now).fromNow();
        },
        now() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
    // 截取字符串
    strSubstring: (str, start = 0, end = 10) => {
        let _str = '';
        if (str.length > end) {
            _str = str.substring(start, end) + '...';
        } else {
            _str = str;
        }
        return _str;
    },
    // 替换字符串
    strReplace: (str, oldR, newR) => {
        return str.replace(oldR, newR);
    },
    toTreeJson: (data, pid) => {
        let result = [];
        let temp;
        for (const i in data) {
            if (data[i].parentId === pid) {
                result.push(data[i]);
                temp = fn(data, data[i]._id);
                if (temp.length > 0) {
                    data[i].children = temp;
                }
            }
        }
        return result;
    },
    findIdIndex(arr, id) {
        let ids = arr.map(item => item._id);
        return ids.indexOf(id);
    },
    /**
     * 计算两个日期的间隔时间
     * @param {string} date1
     * @param {string} date2
     */
    diffDate(date1, date2) {
        var start = Math.ceil(new Date(date1).getTime() / 1000);
        var end = Math.ceil(new Date(date2).getTime() / 1000);
        var timestamp = start - end;
        var time = '';
        switch (true) {
            // 一秒内
            case timestamp < 1:
                time = '刚刚';
                break;
            // 一分钟内
            case timestamp < 60:
                time = parseInt(timestamp / 1 + '') + '秒前';
                break;
            // 一小时内
            case timestamp > 60 && timestamp < 3600:
                var t = parseInt(timestamp / 60 + '');
                time = t + '分钟前';
                break;
            // 一天内
            case timestamp >= 3600 && timestamp < 86400:
                var hours = parseInt(timestamp / 3600 + '');
                var minutes = parseInt(((timestamp - (3600 * hours)) / 60) + '');
                time = hours + '小时 ' + minutes + '分钟前';
                break;
            // 一年内
            case timestamp >= 86400 && timestamp < 31536000:
                time = Math.floor(timestamp / 86400) + '天前';
                break;
            // 大于一天
            default:
                time = Math.floor(timestamp / 31536000) + '年前';
        }
        return time;
    }
};
