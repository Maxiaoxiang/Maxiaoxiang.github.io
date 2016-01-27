/**
 * 控制器
 */
function Game(){

	var _ = this,
		w = window,
		d = document,
		canvas = d.createElement('canvas'),
		ctx = canvas.getContext('2d');
	canvas.width = 960;
	canvas.height = 640;
	document.body.appendChild(canvas);
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	
	_.opts = {
		level: 1,				//关卡
		blood: 2,				//生命
		isGameOver: false		//是否结束
	};

	var rope = new Rope(canvas,ctx, _.opts);
	var ox = new Ox(canvas, ctx, _.opts);

	/**
	 * 渲染
	 */
	_.loop = function(){
		ox.opts.x -= ox.opts.speed;
		if(ox.opts.x + ox.opts.radius * 2 <= 0){
			ox.opts.x = canvas.width + ox.opts.radius * 2;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		rope.draw();
		ox.draw();
		requestAnimationFrame(_.loop);
	};

	_.loop();

}