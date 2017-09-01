function ChamferImg(el, opt)
{
	opt = opt || {};
	opt.tl = opt.tl === undefined ? true : opt.tl;
	opt.tr = opt.tr === undefined ? true : opt.tr;
	opt.bl = opt.bl === undefined ? true : opt.bl;
	opt.br = opt.br === undefined ? true : opt.br;

	const SIZE = opt.size !== undefined ? opt.size : 10;
	const COLOR = opt.color || 'white';

	el.style.position = "relative";

	function CreateCorner(bt, br, bb, bl)
	{
		var el_corner;
		el_corner = document.createElement("div")
		el_corner.style.backgroundColor = COLOR;
		el_corner.style.position = "absolute";
		el_corner.style.width = 0;
		el_corner.style.height = 0;
		if(opt.bl)
		{
			el_corner.style.borderLeft = "solid " + SIZE + "px " + COLOR;
			el_corner.style.left = "0";
		}
		if(opt.bt)
		{
			el_corner.style.borderTop = "solid " + SIZE + "px " + COLOR;
			el_corner.style.top = "0";
		}
		if(opt.br)
		{
			el_corner.style.borderRight = "solid " + SIZE + "px " + COLOR;
			el_corner.style.right = "0";
		}
		if(opt.bb)
		{
			el_corner.style.borderBottom = "solid " + SIZE + "px " + COLOR;
			el_corner.style.bottom = "0";
		}
		el_corner.style.borderRight = br ? ("solid " + SIZE + "px " + COLOR) : undefined;
		el_corner.style.borderBottom = bb ? ("solid " + SIZE + "px " + COLOR) : undefined;

		el.appendChild(el_corner);
	}

	if(opt.tl)
		CreateCorner(true, false, false, true);
	if(opt.tr)
		CreateCorner(true, true, false, false);
	if(opt.br)
		CreateCorner(false, true, true, false);
	if(opt.bl)
		CreateCorner(false, false, true, true);
}

function ChamferBg(el, opt)
{
	opt = opt || {};
	opt.tl = opt.tl===undefined ? true : opt.tl;
	opt.tr = opt.tr===undefined ? true : opt.tr;
	opt.bl = opt.bl===undefined ? true : opt.bl;
	opt.br = opt.br===undefined ? true : opt.br;

	const SIZE = opt.size!==undefined ? opt.size : 10;
	const SW = opt.sw!==undefined ? opt.sw : 1;
	const SC = opt.sc || 'black';
	const FC = opt.fc;

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	function SetBg() {
		var rc = el.getBoundingClientRect();
		rc.width = Math.floor(rc.width);
		rc.height = Math.floor(rc.height);
		const W = rc.width-SW;
		const H = rc.height-SW;

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
			/*var gradient = ctx.createRadialGradient(W / 2, H / 2, W / 2, W / 2, H / 2, 0);
			gradient.addColorStop(1, "#eff9ff");
			gradient.addColorStop(.6, "#79838f");*/

			ctx.fillStyle = FC;
			ctx.fill();
		}

		var imgUrl = canvas.toDataURL();
		var img = new Image();
		img.onload = function() {
			el.style.background = 'url(' + imgUrl + ') no-repeat';
		};
		img.src = imgUrl;
	}

	if(opt.resize_observe)
	{
		new ResizeObserver(function(entries) {
			SetBg();
		}).observe(el);
	}
	
	SetBg();
}