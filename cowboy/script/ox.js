/**
 * 牛类
 */
function Ox(canvas, ctx, param){

	this.opts = {
		count: 4,					//数量
		radius: 20,					//中心半径
		speed:10*param.level, 		//速度
		x:100,						//距离顶部距离
		y:100,						//距离顶部距离
		arr:[]						//牛
	};

	/**
	 * 画牛
	 */
	Ox.prototype.draw = function(){
		ctx.beginPath();
		ctx.arc(this.opts.x, this.opts.y, this.opts.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
	};

	/*
	 * 牛数量
	 */
	Ox.prototype.create = function(canvas, ctx, param){
		for(i = 0; i < this.opts.count; i++){
			console.log(this.opts.arr)
	    	this.opts.arr.push(new Ox(canvas, ctx, param));
	    }
	};

	//this.create(canvas, ctx, param);

}