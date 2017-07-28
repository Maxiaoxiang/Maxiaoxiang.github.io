/*
 * javascript轮播图
 * @Author: maxiaoxiang 
 * @Date: 2017-07-25 10:04:25 
 * @Last Modified by: maxiaoxiang
 * @Last Modified time: 2017-07-28 10:01:52
 * TODO: 完善api
 */
;
(function (window) {
  "use strict"

  function Slider(opts, callback) {
    this._init(opts, callback);
  }

  Slider.prototype = {
    constructor: Slider,
    //初始化
    _init: function (opts, callback) {
      //默认配置
      var defaults = {
        target: 'box', //插入容器id
        id: 'wrapper', //id
        duration: 5000, //间隔时间
        data: [] //数据
      };
      this.options = extend(defaults, opts, true);
      this._createdNode();
      this._bindEvent();
      this.start();
    },
    //创建节点
    _createdNode: function () {
      var opts = this.options;
      var data = opts['data'];
      var html = '<div id="' + opts['id'] + '" class="mod-lunbo-slider">\
                            <div style="padding: 3px;">\
                                <div class="lunbo-pic-window lunbo-' + opts['id'] + '-pic"></div>\
                                <div class="lunbo-nav-window">\
                                    <div class="lunbo-nav lunbo-' + opts['id'] + '-nav"></div>\
                                </div>\
                            </div>\
                        </div>';
      var pic_html = ''; //图片
      var nav_html = ''; //导航

      for (var i = 0, len = data.length; i < len; i++) {
        pic_html += '<div class="lunbo-slides lunbo-' + opts['id'] + '-slide" style="overflow:hidden;">\
                        <a href="' + data[i]['url'] + '" target="_blank" class="lunbo-pointer">\
                            <div class="lunbo-pic-box">\
                                <div class="lunbo-img"><img src="' + data[i]['img'] + '" class="lunbo-figure"></div>\
                            </div>\
                            <div class="lunbo-desc">' + data[i]['title'] + '</div>\
                        </a>\
                    </div>';
        nav_html += '<div class="lunbo-thumb">\
                        <a href="' + data[i]['url'] + '" target="_blank" class="lunbo-pointer">\
                            <img src="' + data[i]['img'] + '">\
                            <div class="lunbo-thumb-mask"></div>\
                        </a>\
                    </div>';
      }
      //查找不到容器时插入body
      if (document.getElementById(opts['target'])) {
        append(document.getElementById(opts['target']), html);
      } else {
        append(document.body, html);
      }
      this.$pic = getElementsByClassNamefunction('lunbo-' + opts['id'] + '-pic')[0];
      this.$nav = getElementsByClassNamefunction('lunbo-' + opts['id'] + '-nav')[0];
      append(this.$pic, pic_html);
      append(this.$nav, nav_html);
      this.slide = getElementsByClassNamefunction('lunbo-' + opts['id'] + '-slide');
      this.slide[0].style.display = 'block';
      this.$nav.childNodes[0].className = 'lunbo-thumb lunbo-thumb-border';
    },
    //下一项
    next: function () {
      var len = this.$nav.childNodes.length;
      var cls = 'lunbo-' + this.options['id'] + '-slide';
      for (var i = 0; i < len; i++) {
        var nav = this.$nav.childNodes;
        if (this.$nav.childNodes[i].className == 'lunbo-thumb lunbo-thumb-border') {
          this.slide[i].className = 'lunbo-slides ' + cls;
          nav[i].className = 'lunbo-thumb';
          if (i + 1 === len) {
            nav[0].className = 'lunbo-thumb lunbo-thumb-border';
            this.slide[0].className = 'lunbo-slides lunbo-show ' + cls;
            this.$nav.style.left = '0px';
          } else {
            nav[++i].className = 'lunbo-thumb lunbo-thumb-border';
            this.slide[i].className = 'lunbo-slides lunbo-show ' + cls;
            var left = this.$nav.offsetLeft;
            var pw = this.$nav.offsetParent.offsetWidth; //父级宽度
            var max = Math.abs(left) + pw;
            if (nav[i].offsetLeft + nav[i].offsetWidth > max) {
              this.$nav.style.left = left - (nav[i].offsetLeft + nav[i].offsetWidth - max) + 'px';
            }
          }
        }
      }
    },
    //开始
    start: function () {
      var that = this;
      this.timer = setInterval(that.next.bind(that), that.options['duration']);
    },
    //暂停
    stop: function () {
      var that = this;
      this.timer && clearInterval(that.timer);
    },
    //销毁
    destroy: function () {
      document.getElementById(this.options['id']).parentNode.removeChild(document.getElementById(this.options['id']));
    },
    //绑定事件
    _bindEvent: function () {
      var len = this.$pic.childNodes.length;
      var cls = 'lunbo-' + this.options['id'] + '-slide';
      var that = this;
      for (var i = 0; i < len; i++) {
        (function (i) {
          that.slide[i].onmouseover = function () {
            that.stop();
          };
          that.slide[i].onmouseout = function () {
            that.start();
          };
          that.$nav.childNodes[i].onmouseover = function () {
            var len = siblings(this).length;
            for (var k = 0; k < len; k++) {
              siblings(this)[k].className = 'lunbo-thumb';
              siblings(that.slide[i])[k].className = 'lunbo-slides ' + cls;
            }
            this.className = 'lunbo-thumb lunbo-thumb-border';
            that.slide[i].className = 'lunbo-slides lunbo-show ' + cls;
            that.stop();
            var left = that.$nav.offsetLeft;
            var pw = that.$nav.offsetParent.offsetWidth; //父级宽度
            var max = Math.abs(left) + pw;
            if (this.offsetLeft > left && this.offsetLeft < max) {
              if (this.offsetLeft < Math.abs(left)) {
                that.$nav.style.left = -(this.offsetLeft) + 'px';
              }
              if (this.offsetLeft + this.offsetWidth > max) {
                if (left < 0) {
                  that.$nav.style.left = left - (this.offsetLeft + this.offsetWidth - max) + 'px';
                } else {
                  that.$nav.style.left = max - (this.offsetLeft + this.offsetWidth) + 'px';
                }
              }
            }
          };
          that.$nav.childNodes[i].onmouseout = function () {
            that.start();
          };
        })(i);
      }
    }
  };

  Slider.attach = function (options) {
    return new Slider(options);
  };

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
      return Slider;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Slider.attach;
    module.exports.Slider = Slider;
  } else {
    window.Slider = Slider;
  }

  /**
   * 合并对象
   * @param {obj} o
   * @param {obj} n 
   * @param {boolean} override 
   */
  function extend(o, n, override) {
    for (var key in n) {
      if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
        o[key] = n[key];
      }
    }
    return o;
  }

  //根据class查找dom
  function getElementsByClassNamefunction(className, context, tagName) {
    if (typeof context == 'string') {
      tagName = context;
      context = document;
    } else {
      context = context || document;
      tagName = tagName || '*';
    }
    if (context.getElementsByClassName) {
      return context.getElementsByClassName(className);
    }
    var nodes = context.getElementsByTagName(tagName);
    var results = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var classNames = node.className.split(' ');
      for (var j = 0; j < classNames.length; j++) {
        if (classNames[j] == className) {
          results.push(node);
          break;
        }
      }
    }
    return results;
  }

  /**
   * 获取兄弟节点
   * @param {Dom} elm 
   */
  function siblings(elm) {
    var a = [];
    var p = elm.parentNode.children;
    for (var i = 0, pl = p.length; i < pl; i++) {
      if (p[i] !== elm) a.push(p[i]);
    }
    return a;
  }

  //兼容bind
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {
      var _self = this,
        args = arguments;
      return function () {
        _self.apply(obj, Array.prototype.slice.call(args, 1));
      }
    }
  }

  /**
   * 插入节点
   * @param {Dom} parent 父级节点
   * @param {String} text 节点
   */
  function append(parent, text) {
    if (typeof text === 'string') {
      var temp = document.createElement('div');
      temp.innerHTML = text;
      // 文档碎片
      var frag = document.createDocumentFragment();
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      parent.appendChild(frag);
    } else {
      parent.appendChild(text);
    }
  }

})(window);
