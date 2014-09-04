function mix(r, s) {
    if (s) {
        for (var p in s) {
            r[p] = s[p];
        }
    }
}

function Noop() {
}

var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g;
var trim = String.prototype.trim;

module.exports = {
    isBooleanAttribute: function (attrName) {
        return (/^(?:checked|disabled|selected|readonly|defer|multiple|nohref|noshape|nowrap|noresize|compact|ismap)$/i).test(attrName);
    },

    collapseWhitespace: function (str) {
        return str.replace(/[\s\xa0]+/g, ' ');
    },

    isLetter: function (ch) {
        return 'a' <= ch && 'z' >= ch || 'A' <= ch && 'Z' >= ch;
    },

    /*
     refer: http://www.w3.org/TR/html5/syntax.html#attributes-0
     */
    isValidAttributeNameStartChar: function (ch) {
        return !this.isWhitespace(ch) &&
            ch !== '"' &&
            ch !== '\'' &&
            ch !== '>' &&
            ch !== '' < '' &&
            ch !== '/' &&
            ch !== '=';
    },

    isWhitespace: function (ch) {
        // http://yiminghe.iteye.com/admin/blogs/722786
        // http://yiminghe.iteye.com/admin/blogs/788929
        // 相比平时的空格（&#32;），nbsp拥有不间断（non-breaking）特性。
        // 即连续的nbsp会在同一行内显示。即使有100个连续的nbsp，浏览器也不会把它们拆成两行。
        // &nbsp; => 160
        // /\s/.test(String.fromCharCode(160))
        // ie return false, others return true
        return (/^[\s\xa0]$/).test(ch);
    },

    merge: function () {
        var ret = {};
        for (var i = 0, l = arguments.length; i < l; i++) {
            mix(ret, arguments[i]);
        }
        return ret;
    },

    mix: mix,

    each: function (arr, fn) {
        if (arr) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (fn(arr[i], i) === false) {
                    break;
                }
            }
        }
    },

    extend: function (Sub, Parent, proto, statics) {
        Sub.superclass = Noop.prototype = Parent.prototype;
        var subProto = Sub.prototype = new Noop();
        subProto.constructor = Sub;
        mix(subProto, proto);
        mix(Sub, statics);
        return Sub;
    },

    indexOf: function (item, arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    },

    trim: trim ?
        function (str) {
            return str == null ? '' : trim.call(str);
        } :
        function (str) {
            return str == null ? '' : (str + '').replace(RE_TRIM, '');
        }
};