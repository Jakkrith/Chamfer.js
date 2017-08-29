# Chamfer.js

Given any HTML element, use Chamfer.js to make it have chamfered borders and optionally a solid fill.

![](https://github.com/MISoftware/Chamfer.js/raw/master/img/demo.png)

## Usage

Include ResizeObserver.js polyfill:

```
<script src="dist/ResizeObserver.js"></script>
```

Include chamfer.js:

```
<script src="dist/chamfer.js"></script>
```


Call ChamferBg(el:Element, [options:Object]) for each element to chamfer:

```JS
var el = document.getElementById('box');
ChamferBg(el, {
	size: 20,
	sw: 6,
	sc: '#447aec',
	fc: '#21ceff',
	tl: false,
	br: false,
	resize_observe: true
});
```


The following options and their default values are available:

```JS
{
	size: 5,	// chamfer size
	sw: 1,		// stroke width
	sc: 'black',	// stroke color,
	fc: undefined,	// fill color

	tl: true,	// chamfer top-left corner?
	tr: true,	// chamfer top-right corner?
	bl: true,	// chamfer bottom-left corner?
	br: true,	// chamfer bottom-right corner?

	resize_observe: false
	// turn on resize_observe observer?
	// this will observer whenever the element
	// resizes and will refresh the background
}
```

## TODO

- Allow to choose the angle of the chamfer