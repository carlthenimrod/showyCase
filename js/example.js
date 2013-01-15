//on ready
$(function(){

	//activate showyCase
	$('#element').showyCase({
				ajaxDataUrl: 'json/jquery.multi.json',
		multiJSON: true,
		onImgClick: 'blurbGallery'
	});
});