/**
 * jquery信息提示插件
 * @version 1.0.0
 * @author mss
 * @Date: 2017-07-31 14:21:54 
 * @Last Modified by: maxiaoxiang
 * @Last Modified time: 2017-07-31 17:37:32
 */
;
(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {

    //配置参数
    var defaults = {
        prefix: 'mss', //class前缀
        content: '请填入提示内容', //提示内容
        triggerMode: 'hover', //触发方式:hover,click,focus
        delayTime: 0, //延迟触发时间
        destroyTime: 0, //存在时间
        position: ['cb', 'cl'], //方位
        offset: [0, 0], //偏移量（px）
        followMouse: false, //是否跟随鼠标移动
        zIndex: 999, //层级
        callback: function () {} //回调
    };

    var ToolTip = function (element, options) {
        //全局变量
        var opts = options, //配置
            _ = this,
            $d = $(document),
            $w = $(window),
            $b = $('body'),
            _isShow = false, //是否正在显示
            $this = $(element); //容器

        //初始化
        var init = function () {
            for (var i in element.dataset) { //遍历dataset覆盖配置参数
                opts[i] = element.dataset[i];
            }
            create();
        };

        //创建节点
        var create = function () {
            if (_isShow) {
                return false;
            }
            var $tip = $('<div class="' + opts['prefix'] + '-tips">' + opts['content'] + '</div>'); //节点容器
            $b.append($tip);
            _isShow = !_isShow;
            var _offset = $this.offset();
            var _t = (function () {
                var offset = $this.offset();
                return {
                    'left': offset.left - _offset.left,
                    'top': offset.top - _offset.top,
                    'width': $this.width(),
                    'height': $this.height()
                };
            })();
            var _n = {
                'width': $tip.width(),
                'height': $tip.height()
            };
            var points = {
                'l': 0,
                't': 0,
                'c': 0.5,
                'r': 1,
                'b': 1
            };
            var _left = _t['left'] + _t['width'] * points[opts['position'][0].charAt(0)] - _n['width'] * points[opts['position'][1].charAt(0)];
            var _top = _t['top'] + _t['height'] * points[opts['position'][0].charAt(1)] - _n['height'] * points[opts['position'][1].charAt(1)];
            $tip.css({
                'position': 'absolute',
                'left': _left + opts.offset[0] + 'px',
                'top': _top + opts.offset[1] + 'px',
                'z-index': opts['zIndex']
            });
        };

        //销毁节点
        var destroy = function (obj) {
            if (opts.destroyTime === 0) {
                obj.remove();
                isShow = false;
            } else {
                time && clearTimeout(time);
                var time = setTimeout(function () {
                    obj.remove();
                    isShow = false;
                }, opts.destroyTime);
            }
        };
        init();
    };

    $.fn.tooltip = function (parameter, callback) {
        if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var tooltip = new ToolTip(this, options);
            callback(tooltip);
        });
    };

}));