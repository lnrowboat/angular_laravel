$(document).ready(function () {
	$('.mainnav li').bind('click', function (e) {
		e.stopPropagation();
		if ($(this).is('li li')) {
			$(this).parent().children().removeClass('active bg');
			$(this).addClass('active');
			$('.sidebar').toggleClass('mobileinactive');
			return;
		}
		if (!$(this).is('.haschild')) {
			$('.mainnav li').removeClass('active bg');
			$(this).addClass('active');
			$('.sidebar').toggleClass('mobileinactive');
			$('.mainnav ul').slideUp();
			return;
		}
		var $childList = $(this).find('ul');
		if ($childList.length > 0) {
			if ($childList.is(':visible')) {
				$childList.slideUp();
				$(this).removeClass('active');
				return;
			}
			$('.mainnav ul:visible').slideUp();
			$('.mainnav li').removeClass('active bg');
			$childList.slideDown(300);
			$(this).addClass('active');
		}
	});
	$('body').on('click', function (e) {
		$('.sidebar').removeClass('active');
		$('.list-group').removeClass('active');
	});
});