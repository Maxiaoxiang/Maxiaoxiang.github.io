/**
 * resizable缩放插件
 * @version 0.1
 * @url http://maxiaoxiang.com
 * @E-mail 251445460@qq.com
 */
;(function($,window,document,undefined){

	var defaults = {
		rangeCls:'range',//最大范围
		startResize:function(){},//开始缩放事件
		resizeing:function(){},//缩放时事件
		stopResize:function(){}//停止缩放事件
	};

	var Resizable = function(element,options){
		var _ = this;
		var $this = $(element);
		var isReszeing = false;//标识
		var $body = $('body');
		var $window = $(window);
		var $document = $(document);
		var $e = $('<div class="e-resize" data-type="e-resize"></div>');
		var $s = $('<div class="s-resize" data-type="s-resize"></div>');
		var $se = $('<div class="se-resize" data-type="se-resize"></div>');
		var $range = options.rangeCls ? $('.' + options.rangeCls) : $window;
		//开始
		_.start = function(handle,e,func){
			if(options.startResize(_) != false){
				(func || function(){})();
				isReszeing = true;
				$document.on({
					'mousemove':function(e){
						_.resizeing(handle,e);
					},
					'mouseup':function(e){
						_.stop(e);
					}
				});
			}
		};
		//缩放
		_.resizeing = function(handle,e){
			if(isReszeing && options.resizeing(_) != false){
				var type = handle.data('type');
				$body.css({'cursor':type});
				switch (type){
					case 'e-resize':
						$this.css({'width':_.getMouseCoords(e).x - $this.offset().left + 'px'});
						$s.css({'width':$this.outerWidth()});
						break;
					case 's-resize':
						$this.css({'height':_.getMouseCoords(e).y - $this.offset().top + 'px'});
						$e.css({'height':$this.outerHeight()});
						break;
					default:
						$this.css({'width':_.getMouseCoords(e).x - $this.offset().left + 'px','height':_.getMouseCoords(e).y - $this.offset().top + 'px'});
						$e.css({'height':$this.outerHeight()});
						$s.css({'width':$this.outerWidth()});
				}
			}
		};
		//停止
		_.stop = function(handle,e){
			if(isReszeing){
				isReszeing = false;
				$body.css({'cursor':'auto'});
				$document.off('mousemove',_.resizeing(handle,e));
				options.stopResize(_);
			}
		};
		//返回当前鼠标坐标
		_.getMouseCoords = function(e){
			if(e.pageX || e.pageY){
				return {x : e.pageX , y : e.pageY};
			}
			return {
				x : e.clientX + document.body.scrollLeft - document.body.clientLeft,
				y : e.clientY + document.body.scrollTop - document.body.clientTop
			};
		};
		var init = function(){
			var rb = parseInt($this.css('border-right-width')) || 0;
			var bb = parseInt($this.css('border-bottom-width')) || 0;
			var zIndex = $this.css('z-index') == 'auto' ? 'auto' : $this.css('z-index');
			$e.css({
				'position': 'absolute',
				'top':0 - rb,
				'right':'-4px',
				'height': $this.outerHeight(),
				'width':'8px',
				'z-index': zIndex,
				'cursor': 'e-resize'
			}).appendTo($this);
			$s.css({
				'position': 'absolute',
				'left':0 - bb,
				'bottom':'-4px',
				'height': '8px',
				'width':$this.outerWidth(),
				'z-index': zIndex,
				'cursor': 's-resize'
			}).appendTo($this);
			$se.css({
				'position': 'absolute',
				'right':'-1px',
				'bottom':'-1px',
				'height': '16px',
				'width': '16px',
				'z-index': zIndex,
				'cursor': 'se-resize'
			}).appendTo($this);
			var arr = [$e,$s,$se];
			for(var i in arr){
				arr[i].on('mousedown',function(e){
					_.start($(this),e);
				});
			}
		};
		init();
	};
	
	$.fn.resizable = function(parameter,callback){
		if(typeof parameter == 'function'){//重载
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var resizable = new Resizable(this,options);
			callback(resizable);
		});
	};

	return $;

})(jQuery,window,document);