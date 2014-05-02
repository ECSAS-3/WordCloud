$(document).ready(function (){
	$("#about-link").click(function (){
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 1500);
	}); // close about link click

	$("#submit-btn").click(function (){
		$('html, body').animate({
			scrollTop: $("#cloud").offset().top
		}, 1500);
	}); // close submit button click

    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });
    
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    })

}); // close document ready