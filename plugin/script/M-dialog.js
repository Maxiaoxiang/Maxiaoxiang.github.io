/**
 * Dialog弹出层插件
 * @authors Mxx
 * @date    2015-11-03
 * @version 0.2
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
		button:{},
		beforeShow:function(){}
	};

	var Dialog = function(element,options){
		var _ = this;
		var $this = $(element);
		var $body = $('body');
		var $window = $(window);
		var $title = $('<div class="M-title">'+options.title+'</div>');//标题
		var $close = $('<div class="M-close">'+options.close+'</div>');//关闭按钮
		var $content = $('<div class="M-content">'+options.content+'</div>');//内容区域
		var $button = $('<div class="M-button"></div>');//按钮
		var $mask = $('.M-mask');
		_.open = function(){
			$this.show();
			if(options.isMask){
				$mask.show();
			}
		};
		_.close = function(){
			$this.hide();
			if($mask.length !== 0){
				$mask.hide();
			}
		};
		_.resize = function(){
			$this.css({
				'top': ($window.height() - $this.outerHeight()) / 2 + 'px',
				'left': ($window.width() - $this.outerWidth()) / 2 + 'px'
			});
		};
		var init = function(){
			$this.css({
				'display':'none',
				'position':'absolute',
				'top':($window.height() - $this.outerHeight()) / 2 + 'px',
				'left':($window.width() - $this.outerWidth()) / 2 + 'px',
				'z-index':options.zIndex
			}).empty().append($title).append($close).append($content);
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
			$button.appendTo($content);
			$close.click(_.close);
			$window.resize(_.resize);
			if(options.clickMask){
				$mask.click(_.close);
			}
			for(name in options.button){
				(function(name){
					$('<a href="javascript:;" class="'+options.button.cls+'">'+name+'</a>').appendTo($button).click(function(){
						options.button[name](_);
					});
				})(name);
			}
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
			var dialog = new Dialog(this,options,callback);
			callback(dialog);
			return dialog.open();
		});
	};	

	return $;

})(jQuery,window,document);