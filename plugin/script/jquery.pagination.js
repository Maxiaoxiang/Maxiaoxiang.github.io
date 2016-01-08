/**
 * paging分页
 */
;(function($,window,document,undefined){

	//配置参数
	var defaults = {
		totalData:null,			//数据总条数
		showData:null,			//每页显示的条数
		pageCount:9,			//总页数,默认为9
		current:1,				//当前第几页
		prevCls:'prev',			//上一页class
		nextCls:'next',			//下一页class
		activeCls:'active',		//当前页选中状态
		coping:false,			//首页和末页
		count:3,				//当前页前后分页个数
		callback:function(){}	//回调
	};

	var Pagination = function(element,options){
		//全局变量
		var opts = options,//配置
			current,//当前页
			$obj = $(element);//容器

		//获取总页数
		this.getTotalPage = function(){
			return opts.totalData && opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
		};

		//获取当前页
		this.getCurrent = function(){
			return current;
		};

		//填充数据
		this.filling = function(index){
			var html = '';
			current = index || opts.current;//当前页码
			var pageCount = this.getTotalPage();
			if(current > 1){//上一页
				html += '<a href="javascript:;" class="'+opts.prevCls+'"><</a>';
			}else{
				$obj.find('.'+opts.prevCls) && $obj.find('.'+opts.prevCls).remove();
			}
			if(current >= opts.count * 2 && current != 1 && pageCount != opts.count){
				html += opts.coping ? '<a href="javascript:;">1</a><span>...</span>' : '';
			}
			var start = current - opts.count,
				end = current + opts.count;
			((start > 1 && current < opts.count) || current == 1) && end++;
			(current > pageCount - opts.count && current >= pageCount) && start++;
			for (;start <= end; start++) {
				if(start <= pageCount && start >= 1){
					if(start != current){
						html += '<a href="javascript:;">'+ start +'</a>';
					}else{
						html += '<span class="'+opts.activeCls+'">'+ start +'</span>';
					}
				}
			}
			if(current + opts.count < pageCount && current >= 1 && pageCount > opts.count){
				html += opts.coping ? '<span>...</span><a href="javascript:;">'+pageCount+'</a>' : '';
			}
			if(current < pageCount){//下一页
				html += '<a href="javascript:;" class="'+opts.nextCls+'">></a>'
			}else{
				$obj.find('.'+opts.nextCls) && $obj.find('.'+opts.nextCls).remove();
			}

			$obj.empty().html(html);
		};

		//绑定事件
		this.eventBind = function(){
			var self = this;
			$obj.on('click','a',function(){
				if($(this).hasClass(opts.nextCls)){
					var index = parseInt($obj.find('.'+opts.activeCls).text()) + 1;
				}else if($(this).hasClass(opts.prevCls)){
					var index = parseInt($obj.find('.'+opts.activeCls).text()) - 1;
				}else{
					var index = parseInt($(this).text());
				}
				self.filling(index);
				typeof opts.callback === 'function' && opts.callback(index);
			});
		};

		//初始化
		this.init = function(){
			this.filling(opts.current);
			this.eventBind();
		};
		this.init();
	};

	$.fn.pagination = function(parameter,callback){
		if(typeof parameter == 'function'){
			callback = parameter;
			parameter = {};
		}else{
			parameter = parameter || {};
			callback = callback || function(){};
		}
		var options = $.extend({},defaults,parameter);
		return this.each(function(){
			var pagination = new Pagination(this,options);
			callback(pagination);
		});
	};

	return $;

})(jQuery,window,document);