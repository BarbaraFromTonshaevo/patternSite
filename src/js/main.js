"use strict";

(function($){ 
$(document).ready(function(){

	// Зациклить фенсибокс
	$("[data-fancybox]").fancybox({
		loop: true,
	});

	// Маска на поле телефона
	$(".mask-tel").mask("+7 (999) 999-99-99");
	$(".mask-tel").click(function(){
		var text = $(this).val()[4];
		if(text == "_"){
			$(this).get(0).setSelectionRange(4, 4);
		};
	});


	// Открыть окно Заказать звонок
	$(".show-order-call").click(function(){
		$(".window__container.order-call, .window__container.order-call > .window").addClass("active");
	});
	
	// Закрыть окна
	$(".window__close").click(function(){
		$(this).closest(".window__container").removeClass("active");
		$(this).closest(".window").removeClass("active");
	});
	$(".window__container").mouseup(function(e){
		var notCloseWindow = $(".window");
		if(!notCloseWindow.is(e.target) && notCloseWindow.has(e.target).length === 0){
			$(this).removeClass("active");
			$(this).find(".window").removeClass("active");
		};
	});


	
























	if($(window).width() < 640){
		$(".content table").wrap("<div class='table-wrap'></div>");
	};


	// Адаптив
	if($(window).width() < 1280){

	};



});
})(jQuery);