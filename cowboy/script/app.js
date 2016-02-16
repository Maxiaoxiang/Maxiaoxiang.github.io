/**
 * 入口
 */
(function(){

	var w = window,
		d = document,
		canvas = d.createElement('canvas'),
		ctx = canvas.getContext('2d');
	canvas.width = 960;
	canvas.height = 640;
	document.body.appendChild(canvas);
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	var game = new Game('canvas');

})();