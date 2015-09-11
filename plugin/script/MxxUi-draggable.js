/**
 * Draggable拖动插件
 * @authors Mxx
 * @date    2015-03-18 09:16:03
 * @version 0.1
 */

;(function($,window,document,undefined){

	$.extend({

		mouseCoords : function(e){

			if(e.pageX || e.pageY){

				return {x : e.pageX , y : e.pageY};

			}

			return {

				x : e.clientX + document.body.scrollLeft - document.body.clientLeft,

				y : e.clientY + document.body.scrollTop - document.body.clientTop

			};

		},

		getStyle : function(obj,styleName){

			return obj.currentStyle ? obj.currentStyle[styleName] : document.defaultView.getComputedStyle(obj,null)[styleName];

		}

	});

	$.fn.MxxDraggable = function (method){

		if(methods[method]){

			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));

		}else if(typeof method === 'object' || !method){

			return methods.init.apply(this,arguments);

		}else{

			$.error('方法' + method + '不存在');

		}

	};

	var methods = {

		init : function(options){

			var opts = $.extend({},$.fn.MxxDraggable.defaults,options);

			return this.each(function(){

				var bDraging = false,	//是否正在拖动
					moveEle = $(this),		//移动的元素 
					focuEle = opts.focuEle ? $(opts.focuEle,moveEle) : moveEle,//把手
					clone = $('<div id="cloneDragEle" style="border:1px dashed #ccc;z-index:9998;position:absolute;border-radius:5px;"></div>');//克隆边框
					opts.hasClone ? cloneEle = clone : cloneEle = moveEle;
				
				if(!focuEle || focuEle.length <= 0){

					$.error("元素未找到,必须是" + this.id + "的子元素");

					return false;

				}

				var dragParams = {initDiffX : '',initDiffY : '',moveX : '',moveY : ''};

				moveEle.css({'position' : 'absolute'});

				//开始拖动
				focuEle.on('mousedown',function(e){

					bDraging = true;
	
					//鼠标离元素left的距离
					dragParams.initDiffX = $.mouseCoords(e).x - moveEle.position().left;
					//鼠标离元素top的距离
					dragParams.initDiffY = $.mouseCoords(e).y - moveEle.position().top;
					
					cloneEle.css({

						'height' : moveEle.outerHeight(),

						'width' : moveEle.outerWidth(),

						'left' : moveEle.offset().left,

						'top' : moveEle.offset().top,

						'cursor' : 'move'

					}).appendTo(document.body);	

					//拖动
					$(document).on('mousemove',function(e){

						e.stopPropagation();

						e.preventDefault();
						
						if(bDraging){

							dragParams.moveX = $.mouseCoords(e).x - dragParams.initDiffX;
							
		           			dragParams.moveY = $.mouseCoords(e).y - dragParams.initDiffY;

		           			//限制拖动范围fixarea[minX,maxX,minY,maxY]
		           			if(opts.fixarea){

									if(dragParams.moveX < opts.fixarea[0] + 10){

				                            dragParams.moveX = opts.fixarea[0];

				                        }

			                        if(dragParams.moveX > opts.fixarea[1] - cloneEle.outerWidth()){

			                            dragParams.moveX = opts.fixarea[1] - cloneEle.outerWidth();

			                        }

			                        if(dragParams.moveY < opts.fixarea[2] + 10){

			                            dragParams.moveY = opts.fixarea[2];

			                        }

			                        if(dragParams.moveY > opts.fixarea[3] - cloneEle.outerHeight()){

			                            dragParams.moveY = opts.fixarea[3] - cloneEle.outerHeight();

			                        }

		           				}

		           			//拖动方向限制all：上下左右，vertical上下，horizontal左右
		           			if(opts.dragDirection == 'all'){

		           				cloneEle.css({'left' : dragParams.moveX,'top' : dragParams.moveY});

			           		}else if(opts.dragDirection == 'vertical'){

			           			cloneEle.css({'top' : dragParams.moveY});

			           		}else if(opts.dragDirection == 'horizontal'){

			           			cloneEle.css({'left' : dragParams.moveX});

			           		}

		           			//回调
		           			if(opts.callback){

		           				opts.callback.call(opts.callback,dragParams);

		           			}

						}

					});

					//结束拖动
					$(document).on('mouseup',function(){

						bDraging = false;

						var currentX = cloneEle.offset().left,
							currentY = cloneEle.offset().top;

						moveEle.stop().animate({

							top : currentY + 'px',

							left : currentX + 'px'

						},400);

						cloneEle.remove();

						$(document).off('mousemove mouseup');

					});			

				});

			});

		}

	};

	//默认参数
	//未添加参数：
	//开始、拖动时、结束时的回调
	//可拖动范围，默认为浏览器视图窗口
	//是否直接拖动或拖动克隆体
	$.fn.MxxDraggable.defaults = {
		hasClone : true,	//是否克隆
		focuEle : null,		//为空时拖动当前元素，传入参数为被拖动元素的子元素
		callback : null,	//拖动时触发回调
		dragDirection : 'all',		//拖动方向['all']上下左右拖动，['vertical']Y轴拖动，['horizontal']X轴拖动
		fixedarea : null 	//限制拖动区域[minX,maxX,minY,maxY] 
	};

	return $;

})(jQuery,window,document);

