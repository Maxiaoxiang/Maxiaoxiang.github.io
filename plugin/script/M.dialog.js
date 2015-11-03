/**
 * Dialog弹出层插件
 * @authors Mxx
 * @date    2015-11-03
 * @version 0.2
 * (重写)
 */

;(function($,window,document,undefined){

	$.fn.dialog = function(parameter, getApi){

		if(typeof parameter == 'function'){//重载
			getApi = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			getApi = getApi || function(){};
		}

		//默认参数
		var defaults = {
			/*节点绑定*/
			mainCls: 'M-box',//主体class
			closeCls: 'M-close',//关闭class
			confirmCls: 'M-confirm',//确认按钮class
			cancelCls: 'M-cancel',//取消按钮class
			isMask: true,//是否显示遮罩层
			opacity: '0.5',//遮罩层透明度
			/*事件*/
			beforeShow:function(){}//显示前事件
		};
		var options = $.extend({},defaults,parameter);
		var $window = $(window);//窗口
		var $body = $('body');
		return this.each(function(){
			/*节点定义*/
			var $this = $(this);
			var $box = $('.' + options.mainCls);//主体
			var $close = $('.' + options.closeCls);//关闭
			var $confirm = $('.' + options.confirmCls);//确认
			var $cancel = $('.' + options.cancelCls);//取消
			var $mask = $('<div>').addClass('M-mask');//遮罩层
			var _api = {
				//初始
				init:function(){
					$box.css({
						'position':'absolute',
						'left':'50%',
						'top':'50%',
						'margin-left': - $box.width() / 2,
						'margin-top': - $box.height() / 2,
						'z-index':'999'
					});
					$mask.css({
						'position':'fixed',
						'top':'0',
						'left':'0',
						'width':'100%',
						'height':'100%',
						'background':'#000',
						'opacity':options.opacity,
						'z-index':'998'
					});
					this.open();
				},
				//打开
				open:function(func){
					if(options.beforeShow){

					}
					$box.show();
					if(options.isMask){//开启遮罩
						$body.append($mask);
					}
				},
				//重置
				resize:function(){

				},
				//关闭
				close:function(){

				}
			};
			_api.init();
		});
	};

})(jQuery,window,document);