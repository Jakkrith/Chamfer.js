function ChamferBg(el, opt)
{
	opt = opt || {};
	opt.tl = opt.tl===undefined ? true : opt.tl;
	opt.tr = opt.tr===undefined ? true : opt.tr;
	opt.bl = opt.bl===undefined ? true : opt.bl;
	opt.br = opt.br===undefined ? true : opt.br;

	const SIZE = opt.size!==undefined ? opt.size : 10;
	const SW = opt.sw!==undefined ? opt.sw : 3;
	const SC = opt.sc || 'silver';
	const FC = opt.fc;

	function SetBg() {
		var rc = el.getBoundingClientRect();
		rc.width = Math.floor(rc.width);
		rc.height = Math.floor(rc.height);
		const W = rc.width-SW;
		const H = rc.height-SW;

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.canvas.width = rc.width;
		ctx.canvas.height = rc.height;
		ctx.beginPath();
		ctx.translate(SW/2, SW/2);
		if(opt.tl)
		{
			ctx.moveTo(0, SIZE);
			ctx.lineTo(SIZE, 0);
		} else {
			ctx.moveTo(0, 0);
		}
		if(opt.tr)
		{
			ctx.lineTo(W-SIZE, 0);
			ctx.lineTo(W, SIZE);
		} else {
			ctx.lineTo(W, 0);
		}
		if(opt.br)
		{
			ctx.lineTo(W, H-SIZE);
			ctx.lineTo(W-SIZE, H);
		} else {
			ctx.lineTo(W, H);
		}
		if(opt.bl)
		{
			ctx.lineTo(SIZE, H);
			ctx.lineTo(0, H-SIZE);
		} else {
			ctx.lineTo(0, H);
		}
		ctx.closePath();
	
		if(SW)
		{
			ctx.lineWidth = SW;
			ctx.strokeStyle = SC;
			ctx.stroke();
		}
		if(FC)
		{
			ctx.fillStyle = FC;
			ctx.fill();
		}
		el.style.background = 'url(' + canvas.toDataURL() + ')';
	}

	new ResizeObserver(function(entries) {
		SetBg();
	}).observe(el);
	SetBg();
}