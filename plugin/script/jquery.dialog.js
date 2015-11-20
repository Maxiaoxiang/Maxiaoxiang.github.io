/**
 * dialog弹出层插件
 * @version 0.2
 * @url http://www.maxiaoxiang.com
 * @E-mail 251445460@qq.com
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
		type:'dialog',//弹窗类型('dialog':默认为对话框,'message':提示消息)
		followScroll:true,//随屏幕滚动
		time:2000,//显示时间
		isDraggable:false,//拖动
		handleCls:'M-title',//拖动把手
		beforeShow:function(){},//显示前事件
		afterHide:function(){}//关闭后事件
	};

	var Dialog = function(element,options){
		var _ = this;
		var $this = $(element);
		var isOpen = false;
		var $body = $('body');
		var $window = $(window);
		var $document = $(document);
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
			$document.off('mousemove mouseup');
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
			var isDraging = false;//是否正在拖动
			var $handle = $('.' + options.handleCls);//拖动把手
			var coordinate = {iX : '',iY : '',mX : '',mY : ''};//鼠标坐标
			$handle.on('mousedown',function(e){
				isDraging = true;
				coordinate.iX = $.mouseCoords(e).x - $this.position().left;
				coordinate.iY = $.mouseCoords(e).y - $this.position().top;
			});
			$document.on({
				'mousemove':function(e){
					e.stopPropagation();
					e.preventDefault();
					if(isDraging){
						coordinate.mX = $.mouseCoords(e).x - coordinate.iX;
						coordinate.mY = $.mouseCoords(e).y - coordinate.iY;
						$this.css({'left':coordinate.mX,'top':coordinate.mY});
					}
				},
				'mouseup':function(){
					isDraging = false;
				}
			});
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
				for(name in options.button){//遍历按钮插入弹窗
					(function (name){
						var mss = name.split('|');
						var cls = mss[1] ? mss[1] : 'btn';
						$('<a href="javascript:;" class="M-'+cls+'">'+mss[0]+'</a>').appendTo($button).click(function(){
							options.button[name](_);
						});
					})(name);
				}
			}
			if(options.isMask && $mask.length == 0){//遮罩
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
			if(options.followScroll) $window.scroll(_.scroll);
			if(options.clickMask) $mask.click(_.close);
			if(options.isDraggable){
				$('.' + options.handleCls).css({'cursor':'move'});
				drag();
			}	
			_.open();
		};
		init();
	};

	$.fn.dialog = function(parameter,callback){
		if(typeof parameter == 'function'){//重载
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

	$.extend({
		mouseCoords : function(e){//返回当前鼠标坐标
			if(e.pageX || e.pageY){
				return {x : e.pageX , y : e.pageY};
			}
			return {
				x : e.clientX + document.body.scrollLeft - document.body.clientLeft,
				y : e.clientY + document.body.scrollTop - document.body.clientTop
			};
		}
	});

	return $;

})(jQuery,window,document);