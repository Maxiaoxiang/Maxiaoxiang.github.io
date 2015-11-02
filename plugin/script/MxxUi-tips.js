/**
 * Tips提示插件
 * @authors Mxx
 * @date    
 * @version 0.1
 */
;(function($,window,document,undefined){

	var Tip = function(element,options){

		this.$element = $(element);

		this.options = $.extend({},Tip.defaults,options);

	};

	Tip.prototype = {

		init : function(){

			this._initUI();

			this._setDirection();

			this._destroy();

		},

		_initUI : function(){

			var that = this;

			this.baseTip = $('<div id="MxxTips_box"><div class="entry-triangle-top"></div>' + this.options.content + '</div>');

			this.baseTip.appendTo(document.body).css({

				left : this.$element.offset().left - 15,

				top : this.$element.offset().top - this.baseTip.height() - 40

			});

		},

		_scrollbarWidth : function() {

			var cachedScrollbarWidth;

			if ( cachedScrollbarWidth !== undefined ) {

				return cachedScrollbarWidth;

			}

			var w1, w2,
				div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
				innerDiv = div.children()[ 0 ];

			$( "body" ).append( div );

			w1 = innerDiv.offsetWidth;

			div.css( "overflow", "scroll" );

			w2 = innerDiv.offsetWidth;

			if ( w1 === w2 ) {

				w2 = div[ 0 ].clientWidth;

			}

			div.remove();

			return ( cachedScrollbarWidth = w1 - w2 );

		},

		_setDirection : function(){

			var triangle = this.baseTip.find('.entry-triangle-top');

			switch(this.options.direction){

				case "all":

					if(this.baseTip.offset().top < 0){

						this.baseTip.css({

						left : this.$element.offset().left,

						top : this.$element.offset().top + this.baseTip.height() + 8

					});

					triangle.removeClass('entry-triangle-top').addClass('entry-triangle-bottom');

					}else if(this.baseTip.offset().left < 0){

						this.baseTip.css({

						left : this.$element.offset().left + this.$element.width() + 15,

						top : this.$element.offset().top - this.$element.height() / 2

					});

					triangle.removeClass('entry-triangle-top').addClass('entry-triangle-right');

					}else if(this.baseTip.offset().left + this.baseTip.outerWidth() >= $(window).width()){

						this.baseTip.css({

							left : this.$element.offset().left - this.baseTip.outerWidth() - 30,

							top : this.$element.offset().top - this.$element.height() / 2

						});

						triangle.removeClass('entry-triangle-top').addClass('entry-triangle-left');

						}

					break;

				case "top":

					this.baseTip.css({

						left : this.$element.offset().left - 15,

						top : this.$element.offset().top - this.baseTip.outerHeight() - 10

					});

					break;

				case "bottom":

					this.baseTip.css({

						left : this.$element.offset().left,

						top : this.$element.offset().top + this.baseTip.height() + 8

					});

					triangle.removeClass('entry-triangle-top').addClass('entry-triangle-bottom');

					break;

				case "left":

					this.baseTip.css({

						left : this.$element.offset().left - this.baseTip.outerWidth() - 10,

						top : this.$element.offset().top - this.$element.height() / 2

					});

					triangle.removeClass('entry-triangle-top').addClass('entry-triangle-left');

					break;

				case "right":

					this.baseTip.css({

						left : this.$element.offset().left + this.$element.width() + 15,

						top : this.$element.offset().top - this.$element.height() / 2

					});

					triangle.removeClass('entry-triangle-top').addClass('entry-triangle-right');

					break;

				default:

					break;
			}

		},

		_destroy : function(){

			var that = this;

			this.$element.on('mouseout',function(){

				that.baseTip.remove();

			});

		}

	};

	Tip.defaults = {
		
		content:'',		//提示内容
		direction:'all' //提示框出现的方位,'all':自动调整位置,'top':上,初始值,'left':左,'right':右,'bottom':下

	};

	$.fn.MxxTips = function(options){

		var tip = new Tip(this,options);

		return tip.init();

	};

	return $;

})(jQuery,window,document);