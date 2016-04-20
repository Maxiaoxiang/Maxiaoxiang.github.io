/**
 * cascade瀑布流插件
 * @version 0.0.1
 * @url http://www.maxiaoxiang.com
 * @E-mail 251445460@qq.com
 */
;(function($,window,document,undefined){

	//配置参数
	var defaults = {
		liCls: 'item',			//排列元素样式名
		horizontal: '10',		//水平间距
		vertical: '10',			//垂直间距
		callback: function(){}	//回调
	};

	var Cascade = function(element,options){
		//全局变量
		var opts = options,//配置
			$d = $(document),
			$w = $(window),
			$obj = $(element);//容器

		//排列
		this.arrangement = function(){
			var box_w = $obj.width(),
				$li = $('.'+opts.liCls),
				li_w = $li.eq(0).width() + Number(opts.horizontal),
				column = Math.floor(box_w / li_w),
				len = $li.length,
				first_arr = [],
				li_arr = [];
			$li.each(function(i){
				li_arr.push($(this).height());
				if(i < column){
					$li.eq(i).css({
						'position': 'absolute',
						'top': '0',
						'left': li_w * i + 'px'
					});
					first_arr.push($li.eq(i).height());
				}
			});
			for(var i = column; i < len; i++){
				var index = this.getMinIndex(first_arr);
				$li.eq(i).css({	
					'position': 'absolute',
					'top': first_arr[index] + Number(opts.vertical) + 'px',
					'left': li_w * index + 'px'
				});
				first_arr[index] = li_arr[i] + first_arr[index] + Number(opts.vertical);
			}
		};
		//获取最小高度下标
		this.getMinIndex = function(arr){
			var a = arr[0];
			var index = 0;
			for (var i in arr) {
				if (arr[i] < a) {
					a = arr[i];
					index = i;
				}
			}
			return index;
		};
		//窗口变化
		this.resize = function(){
			clearTimeout(time);
			var self = this,
				time = setTimeout(function(){
					$w.resize(function(){
						self.arrangement();
					});
				},500);
		};
		//滚动加载
		this.scroll = function(){
			$w.scroll(function(){
				if($d.scrollTop() + $w.height() >= $d.height()){
					console.log($d)
				}
			});
		};
		//初始化
		this.init = function(){
			this.arrangement();
			this.resize();
			this.scroll();
		};
		this.init();
	};

	$.fn.cascade = function(parameter,callback){
		if(typeof parameter == 'function'){
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var cascade = new Cascade(this,options);
			callback(cascade);
		});
	};

	return $;

})(jQuery,window,document);