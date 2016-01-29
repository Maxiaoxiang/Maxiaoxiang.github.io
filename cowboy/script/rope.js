/**
 * 绳子类
 */
function Rope(canvas, ctx, param){

	this.opts = {
		len:80,					//长度
		radius:30,				//半径
		speed:param.level		//速度
	};

	/**
	 * 画绳子
	 */
	Rope.prototype.draw = function(){
		var that = this;
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, canvas.height);
		ctx.lineTo(canvas.width / 2, canvas.height - this.opts.len);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(canvas.width / 2,canvas.height - this.opts.len - this.opts.radius, this.opts.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
	};
	
}