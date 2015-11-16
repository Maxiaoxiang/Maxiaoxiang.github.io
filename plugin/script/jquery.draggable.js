/**
 * draggable拖动插件
 * @version 0.2
 * @url http://maxiaoxiang.com
 * @E-mail 251445460@qq.com
 */
;(function($,window,document,undefined){

	var defaults = {
		handleCls:'',//拖动把手
		axis:'',//拖动方向
		rangeCls:'',//拖动范围
		beforeDrag:function(){},//开始拖动前事件
		moveDrag:function(){},//拖动时事件
		stopDrag:function(){}//停止拖动后事件
	};

	var Draggable = function(element,options){
		var _ = this;
		var isDraging = false;//拖动开关
		var $this = $(element);
		var $body = $('body');
		var $window = $(window);
		var $document = $(document);
		var coordinate = {iX : '',iY : '',mX : '',mY : ''};//鼠标坐标
		var $handle = options.handleCls ? $('.' + options.handleCls) : $this;//拖动把手
		var $range = options.rangeCls ? $('.' + options.rangeCls) : $window;//拖动范围
		//开始
		_.start = function(e,func){
			if(options.beforeDrag() != false){
				(func || function(){})();
				isDraging = true;
				coordinate.iX = mouseCoords(e).x - $this.position().left;
				coordinate.iY = mouseCoords(e).y - $this.position().top;
				$this.css({'position':'absolute'});
			}
		};
		//拖动中
		_.drap = function(e){
			if(isDraging && options.moveDrag() != false){
				coordinate.mX = mouseCoords(e).x - coordinate.iX;
				coordinate.mY = mouseCoords(e).y - coordinate.iY;
				switch (options.axis){//拖动方向
					case 'x':
						$this.css({'left':coordinate.mX});
						break;
					case 'y':
						$this.css({'top':coordinate.mY});
						break;
					default:
						$this.css({'left':coordinate.mX,'top':coordinate.mY});	
				}
			}
		};
		//停止
		_.stop = function(){
			isDraging = false;
			options.stopDrag();
		};
		//拖动状态
		_.getDraging = function(){
			return isDraging;
		};
		//返回当前鼠标坐标
		var mouseCoords = function(e){
			if(e.pageX || e.pageY){
				return {x : e.pageX , y : e.pageY};
			}
			return {
				x : e.clientX + document.body.scrollLeft - document.body.clientLeft,
				y : e.clientY + document.body.scrollTop - document.body.clientTop
			};
		};
		//初始
		var init = function(){
			$handle.css({'cursor':'move'}).on('mousedown',function(e){
				_.start(e);
			});
			$document.on({
				'mousemove':function(e){
					e.stopPropagation();
					e.preventDefault();
					_.drap(e);
				},
				'mouseup':function(){
					_.stop();
				}
			});
		};
		init();
	};
	
	$.fn.draggable = function(parameter,callback){
		if(typeof parameter == 'function'){//重载
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var draggable = new Draggable(this,options);
			callback(draggable);
		});
	};

	return $;

})(jQuery,window,document);