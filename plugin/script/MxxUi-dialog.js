/**
 * Dialog弹出层插件
 * @authors Mxx
 * @date    2015-03-12 09:46:25
 * @version 0.1
 * (未完成：缓存，api不完全，回调)
 */

;(function($,window,document,undefined){

	var Dialog = function(elem,options){
		this.$elem = elem;
		this.options = $.extend({},Dialog.defaults,options);
	};

	Dialog.defaults = {
		width : 450,									//宽
		dialogType : 'alert',							//弹出层类型
		title : '标题',								//标题
		content: '内容',								//内容
		alertSendSubmit : 'OK',						//alert按钮文本内容
		closeBtn : true, 								//添加关闭按钮
		alertSendCall : function(){} || {},			//alert确定回调
		alertCloseCall : function(){} || {},			//alert关闭回调
		confirmSendSubmit : '确定',					//confirm确定按钮文本
		confirmCancelBtn : '取消',					//confirm取消按钮文本
		confirmSendCall : function(){} || {},			//confirm确定回调
		confirmCancelCall : function(){} || {},		//confirm取消回调
		commonCallback: function(){} || {},			//common回调
		hasMask : true, 								//遮罩层
		isDraggable : true, 							//是否使用拖拽组件(MxxUi-draggable.js)
		draggableOption : {							//拖拽组件的options
			fixarea : [0,document.body.clientWidth,0,$(document).height()]
		}
	};

	Dialog.prototype = {
		//初始化
		init : function(container){
			this.handlers = {};
			this._initUi();
			this._syncUi();
			this._bindUi();
			$(container || document.body).append(this.baseBox);
		},

		//初始化UI
		_initUi : function(){
			var that = this;
			var arr = [];
			var footerContent = '';
			//判断弹出层类型
			switch(this.options.dialogType){
				case 'alert':
					footerContent = '<input class="dialog_alertSendSubmit" type="button" value="'+ this.options.alertSendSubmit +'">';
					break;
				case 'confirm':
					footerContent = '<input class="dialog_confirmSendSubmit" type="button" value="'+ this.options.confirmSendSubmit +'"><input class="dialog_confirmCancelBtn" type="button" value="' + this.options.confirmCancelBtn + '">';
					break;
			}
			arr.push('<div class="dialog_baseBox">'
				+	'<div class="dialog_body">'
				+		'<p class="dialog_content">'+ this.options.content + '</p>'
				+	'</div>'
				+'</div>');
			this.baseBox = $(arr.join(''));

			if(this.options.dialogType != 'common'){
				this.baseBox.find('.dialog_body').prepend('<h2 class="dialog_title">' + this.options.title + '</h2>');
				this.baseBox.append('<div class="dialog_footer clearfix">' + footerContent + '</div>');
			}else{
				this.options.isDraggable = false;
				clearTimeout(des);
				var des = setTimeout(function(){
					that.destroy(function(){
						that.fire('common');
					});
				},1000);
			}

			//是否遮罩
			if(this.options.hasMask){
				this._mask = $('<div class="dialog_mask"></div>');
				this._mask.appendTo('body');
			}
			this.baseBox.appendTo(document.body);

			//是否拖动
			if(this.options.isDraggable){
				this.baseBox.MxxDraggable(this.options.draggableOption);
			}
		},

		//位置
		_syncUi : function(){
			var that = this,
			boxOffset = this.baseBox.height(),
			dragging = false,
			iX,iY,
			boxPaddingTop = parseInt(this.baseBox.css('padding-top')),
			boxPaddingLeft = parseInt(this.baseBox.css('padding-left'));

			this.baseBox.css({
				width : this.options.width + 'px',
				left : (this.options.x || ($(window).width() - this.options.width) / 2 ) - boxPaddingLeft + 'px',
				top : (($(window).height() - boxOffset) / 2 ) + $(document).scrollTop() +'px'
			});

			//窗口变化居中
			$(window).resize(function(){
				clearTimeout(setPosition);
				var setPosition = setTimeout(function(){
					that.baseBox.stop().animate({
						left : (that.options.x || ($(window).width() - that.options.width) / 2 ) - boxPaddingLeft + 'px',
						top :  (($(window).height() - boxOffset) / 2 ) + $(document).scrollTop() +'px'
					},400);
				},200);
			});

			//滚动垂直居中
			$(window).scroll(function(){
				clearTimeout(setScroll);
				var setScroll = setTimeout(function(){
					that.baseBox.stop().animate({
						top : (($(window).height() - boxOffset) / 2 ) + $(document).scrollTop() +'px'
					},500);
				},200);
			});
		},

		//绑定事件
		_bindUi :function(){
			var that = this;
			this.baseBox.delegate('.dialog_alertSendSubmit','click',function(){
				that.fire('alert');
				that.destroy();
			}).delegate('.dialog_confirmSendSubmit','click',function(){
				that.fire('confirm');
				that.destroy();
			}).delegate('.dialog_confirmCancelBtn','click',function(){
				that.fire('cancel');
				that.destroy();
			});

			if(this.options.alertSendCall){
				this.on('alert',this.options.alertSendCall);
			}

			if(this.options.confirmSendCall){
				this.on('confirm',this.options.confirmSendCall);
			}

			if(this.options.confirmCancelCall){
				this.on('cancel',this.options.confirmCancelCall);
			}

			if(this.options.commonCallback){
				this.on('common',this.options.commonCallback);
			}
		},

		//销毁
		destroy : function(callback){
			this.baseBox.off();
			this._mask && this._mask.remove();
			this.baseBox.hide('300',function(){
				if(typeof callback === 'function'){
					this.remove();
					callback();
				}
				this.remove();
			});
		},

		alert : function(defaults){
			$.extend(this.options, defaults,{dialogType:'alert'});
			this.init();
			return this;
		},

		confirm : function(defaults){
			$.extend(this.options, defaults,{dialogType:'confirm'});
			this.init();
			return this;
		},

		common : function(defaults){
			$.extend(this.options, defaults,{dialogType:'common'});
			this.init();
			return this;
		},

		//绑定自定义事件
		on : function(type,handler){

			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}

			this.handlers[type].push(handler);
			return this;
		},

		//执行自定义事件
		fire : function(type,data){

			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0,len = handlers.length;i < len;i++){
					handlers[i](data);
				}
			}
		}

	};

	$.fn.MxxDialog = function(options){
		var dialog = new Dialog(this,options);
		return dialog.init();
	};

	return $;

})(jQuery,window,document);