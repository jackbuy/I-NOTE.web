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
    getUUID: function() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';

        var uuid = s.join('');
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
    }
};
