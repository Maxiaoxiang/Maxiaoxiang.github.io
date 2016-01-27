/**
 * 牛类
 */
function Ox(canvas, ctx, param){

	var _ = this;

	_.opts = {
		count: 4,					//数量
		radius: 20,					//中心半径
		speed:2*param.level, 		//速度
		x:100,						//距离顶部距离
		y:100						//距离顶部距离
	};

	/**
	 * 画牛
	 */
	_.draw = function(){
		ctx.beginPath();
		ctx.arc(_.opts.x, _.opts.y, _.opts.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
	};

}