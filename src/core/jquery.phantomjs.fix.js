jQuery.each(("blur focus focusin focusout click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave").split(" "),
	function(i, name) {

	jQuery.fn[name] = function() {
		var el = this[0];
		var ev = document.createEvent('MouseEvent');
        ev.initMouseEvent(
            name,
            true /* bubble */, true /* cancelable */,
            window, null,
            0, 0, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        el.dispatchEvent(ev);
	};
} );

