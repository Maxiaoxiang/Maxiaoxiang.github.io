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
		this.defaults = {//配置参数
			color:'red'
		};
		this.options = $.extend({},this.defaults,parameter);
	};

	Dialog.prototype = {
		init:function(){
			var $elem = this.$elem;
			
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