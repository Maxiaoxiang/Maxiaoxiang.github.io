/**
 * album 移动端相册插件
 * @version 0.2
 * @url http://www.maxiaoxiang.com
 * @E-mail 251445460@qq.com
 */
;(function($,window,document,undefined){

	//配置参数
	var defaults = {
		callback:function(){}	//回调
	};

	var Album = function(element,options){
		//全局变量
		var opts = options,//配置
			$document = $(document),
			$obj = $(element);//容器

		//初始化
		this.init = function(){

		};
		this.init();
	};

	$.fn.album = function(parameter,callback){
		if(typeof parameter == 'function'){
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