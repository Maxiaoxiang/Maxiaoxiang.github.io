/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/
/**
 * Dialog弹出层插件
 * @authors Mxx
 * @date    2015-11-03
 * @version 0.2
 * （尚未完成：拖拽,按钮class,动画 ,多窗口）
 */
;(function($,window,document,undefined){

	//参数
	var defaults = {
		title:'',//标题
		close:'x',//关闭按钮
		content:'',//内容
		zIndex: '9999',//层级
		isMask: true,//遮罩
		clickMask:false,//遮罩关闭
		opacity:'0.5',//透明度
		button:{},//按钮
		type:'',//弹窗类型('':默认,'message':提示消息)
		follow:true,//随屏幕滚动
		time:2000,//显示时间
		isDraggable:false,//拖动
		beforeShow:function(){},//显示前事件
		afterHide:function(){}//关闭后事件
	};

	var Dialog = function(element,options){
		var _ = this;
		var $this = $(element);
		var isOpen = false;
		var $body = $('body');
		var $window = $(window);
		var $title = $('<div class="M-title">'+options.title+'</div>');//标题
		var $close = $('<div class="M-close">'+options.close+'</div>');//关闭按钮
		var $content = $('<div class="M-content">'+options.content+'</div>');//内容区域
		var $button = $('<div class="M-button"></div>');//按钮
		var $mask = $('.M-mask');//遮罩
		//打开
		_.open = function(func){
			if(options.beforeShow() != false){
				(func || function(){})();
				$this.show();
				if(options.isMask) $mask.show();
				if(options.type == 'message'){//信息提示框自动关闭
					setTimeout(_.close,options.time);
				}
				isOpen = true;
			}
		};
		//关闭
		_.close = function(){
			$this.hide();
			if($mask.length !== 0){
				$mask.remove();
			}
			options.afterHide();
			isOpen = false;
		};
		//窗口变化居中
		_.resize = function(){
			$this.css({
				'top': ($window.height() - $this.outerHeight()) / 2 + 'px',
				'left': ($window.width() - $this.outerWidth()) / 2 + 'px'
			});
		};
		//滚动时居中
		_.scroll = function(){
			$this.css({
				'top':($window.height() - $this.outerHeight()) / 2 + $(document).scrollTop()
			});
		};
		//弹窗类型
		_.getType = function(){
			return options.type;
		};
		//打开状态
		_.getOpen = function(){
			return isOpen;
		};
		//拖动
		var drag = function(){
			//loading...
		};
		//初始
		var init = function(){
			if(options.type == 'message'){//弹窗类型为message不加载title,button,close
				$this.css({
					'display':'none',
					'position':'absolute',
					'top':($window.height() - $this.outerHeight()) / 2 + $(document).scrollTop() + 'px',
					'left':($window.width() - $this.outerWidth()) / 2 + 'px',
					'z-index':options.zIndex
				}).empty().append($content);
			}else{
				$this.css({
					'display':'none',
					'position':'absolute',
					'top':($window.height() - $this.outerHeight()) / 2 + $(document).scrollTop() + 'px',
					'left':($window.width() - $this.outerWidth()) / 2 + 'px',
					'z-index':options.zIndex
				}).empty().append($title).append($close).append($content);
				$button.appendTo($content);
				$close.click(_.close);
				for(name in options.button){
					(function (name){
						$('<a href="javascript:;" class="M-'+name+'">'+name+'</a>').appendTo($button).click(function(){
							options.button[name](_);
						});
					})(name);
				}
			}
			if(options.isMask && $mask.length == 0){
				$mask = $('<div class="M-mask"></div>').css({
					'display':'none',
					'position':'fixed',
					'top':'0',
					'left':'0',
					'width':'100%',
					'height':'100%',
					'background':'#000',
					'opacity':options.opacity,
					'z-index':options.zIndex - 1
				}).appendTo($body).before($this);
			}
			$window.resize(_.resize);
			if(options.follow) $window.scroll(_.scroll);
			if(options.clickMask) $mask.click(_.close);
			if(options.isDraggable) $title.css({'cursor':'move'});
			_.open();
		};
		init();
	};

	Dialog.prototype = {};

	$.fn.mDialog = function(parameter,callback){
		if(typeof parameter == 'function'){
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var dialog = new Dialog(this,options);
			callback(dialog);
		});
	};	

	return $;

})(jQuery,window,document);