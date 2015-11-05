/**
 * Dialog弹出层插件
 * @authors Mxx
 * @date    2015-11-03
 * @version 0.2
 */
;(function($,window,document,undefined){

	var Dialog = function(elem,parameter,getApi){
        if (typeof parameter == 'function') { //重载
            getApi = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            getApi = getApi || function () {};
        }
		this.$elem = elem;
		this.defaults = {
			title:'',//标题
			close:'x',//关闭按钮
			content:'',//内容
			zIndex: '9999',//层级
			isMask: true,//遮罩
			opacity:'0.5',//透明度
			beforeShow:function(){},//展开前事件
			afterHide:function(){}
		};
		this.options = $.extend({},this.defaults,parameter);
	};

	Dialog.prototype = {
		init:function(){
			console.log(this)
			var op = this.options;//配置参数
			var $body = $('body');
			var $window = $(window);//窗口
			$title = $('<div class="M-title">'+op.title+'</div>');//标题
			$close = $('<div class="M-close">'+op.close+'</div>');//关闭按钮
			$content = $('<div class="M-content">'+op.content+'</div>');//内容区域
			this.$mask = $('.M-mask');
			this.$elem.css({
				'display':'none',
				'position':'absolute',
				'top': ($window.height() - this.$elem.outerHeight()) / 2 + 'px',
				'left': ($window.width() - this.$elem.outerWidth()) / 2 + 'px',
				'z-index':op.zIndex
			}).empty().append($title).append($close).append($content);

			if(op.isMask && this.$mask.length == 0){//遮罩
				this.$mask = $('<div class="M-mask"></div>').css({
					'display':'none',
					'position':'fixed',
					'top':'0',
					'left':'0',
					'width':'100%',
					'height':'100%',
					'background':'#000',
					'opacity':op.opacity,
					'z-index':op.zIndex - 1
				}).appendTo($body);
			}

			$close.click(this.close());
			this.open();
		},
		open:function(){
			this.$elem.show();
			this.toggleMask();
		},
		toggleMask:function(){
			if(this.$mask.length != '0' && this.$mask.is(':hidden')){
				this.$mask.show();
			}
		},
		close:function(){
			this.$elem.hide();
			this.toggleMask();
		},
		resize:function(){},
		destroy:function(){}
	};

	$.fn.myDialog = function(options,getApi){
		var dialog = new Dialog(this,options,getApi);
		return dialog.init();
	};

	return $;

})(jQuery,window,document);