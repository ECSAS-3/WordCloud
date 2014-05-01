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
}); // close document ready