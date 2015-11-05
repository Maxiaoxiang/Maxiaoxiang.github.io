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
			title: '',//标题
			titleCls:'M-title',//标题class
			content:'',//内容
			contentCls:'M-content',//内容class
			close:'',//关闭
			closeCls: 'M-close',//关闭class
			okCls: 'M-ok',//确认class
			cancelCls: 'M-cancel',//取消class
			isMask: true,//遮罩层
			opacity: '0.5',//遮罩层透明度
			zIndex: '99999',//层级
			/*事件*/
			beforeShow:function(){},//显示前事件
			afterHide:function(){}//关闭后事件
		};
		var options = $.extend({},defaults,parameter);
		var $window = $(window);//窗口
		var $body = $('body');
		return this.each(function(){
			/*节点定义*/
			var $this = $(this);
			var $close = $('<div class="'+options.closeCls+'">'+options.close+'</div>');//关闭
			var $confirm = $('.' + options.okCls);//确认
			var $cancel = $('.' + options.cancelCls);//取消
			var $title = $('<div class="'+options.titleCls+'">'+options.title+'</div>');//标题
			var $content = $('<div class="'+options.contentCls+'">'+options.content+'</div>');//内容
			var $mask = $('.M-mask');//遮罩层
			var _isOpen = false;
			$this.css({
				'position':'absolute',
                'left': ($window.width() - $this.outerWidth()) / 2+'px' ,
                'top': ($window.height() - $this.outerHeight()) / 2 + 'px',
				'z-index':options.zIndex
			}).append($title).append($content).append($close);
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
				}).appendTo($body);
			}
			var _api = {
				//初始
				init:function(func){
					if(options.beforeShow() != false){
						(func || function(){})();
						this.open();
					}
				},
				//打开
				open:function(){
					$this.show();
					$mask.show();
				},
				//重置位置
				resize:function(){
                    $this.css({
                        'left': ($window.width() - $this.outerWidth()) / 2+'px' ,
                        'top': ($window.height() - $this.outerHeight()) / 2 + 'px'
                    });
				},
				//关闭
				close:function(){
					$this.hide();
					$mask.hide();
					options.afterHide();
				}
			};
			$window.resize(function(){
				_api.resize()
			});
			$close.click(function(){
				_api.close();
			});
			$mask.click(function(){
				_api.close();
			});
			_api.init();
			getApi(_api);
		});
	};

})(jQuery,window,document);