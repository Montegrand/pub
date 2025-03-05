$(document).ready(function () {
	$('.status_map').addClass('status_map1').find('li:first-child a.tit').addClass('on').next('.cont').show();
	$('.status_map a.tit').click(function () {
		var status_map_this = $(this).parents('li').index(),
				status_map_num = status_map_this + 1;
		$('.status_map').removeClass().addClass('status_map').find('.tit').removeClass('on').next('.cont').hide();
		$('.status_map').addClass('status_map' + status_map_num);
		$(this).addClass('on').next('.cont').show();
		return false;
	});
});