$(function() {
	$('select').material_select();
	$(".button-collapse").sideNav({'edge': 'left'});
	height = $(window).height()-134;
	if($('main').outerHeight() < height) {
		$('main').css('minHeight',height);
	} else {
		$('main').css('paddingBottom','55px');
	}
});