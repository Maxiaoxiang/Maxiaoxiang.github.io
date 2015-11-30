/**
 * album相册
 * @version 0.1
 * @url http://maxiaoxiang.com
 * @E-mail 251445460@qq.com
 */
;(function($,window,document,undefined){

	var defaults = {
		angle:20//角度
	};

	var Album = function(element,options){
		var _ = this;
		var $this = $(element);
		var $body = $('body');
		var $window = $(window);
		var $document = $(document);
		var $li = $this.find('li');
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
		//设置角度
		var rotate = function(obj,x){
			obj.css({
				'-webkit-transform':'rotate('+x+'deg)', 
				'-moz-transform':'rotate('+x+'deg)',
				'-ms-transform':'rotate('+x+'deg)',
				'-o-transform':'rotate('+x+'deg)',
				'transform':'rotate('+x+'deg)'
			});
		};
		//切换
		var change = function(obj){
			obj.stop().animate({
				top: -300},
				800, function() {
				obj.css({
					'z-index':1
				}).stop().animate({
					top:0
				},800,function(){
					$li.not(obj).each(function(i){
						var zIndex = $(this).css('z-index');
						$(this).css('z-index',++zIndex)
					});
				});
			});
		};
		//初始
		var init = function(){
			var i = $li.length;
			$li.each(function(){
				var n = options.angle;
				var angle = parseInt(Math.random() * (-n*2) + n);
				$(this).css('z-index',i--);
				rotate($(this),angle);
			});
			$this.on('click','li',function(){
				change($(this));
			});
		};
		init();
	};

	$.fn.album = function(parameter,callback){
		if(typeof parameter == 'function'){//重载
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var album = new Album(this,options);
			callback(album);
		});
	};

	return $;

})(jQuery,window,document);