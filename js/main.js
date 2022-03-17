// Sticky header____________________________________________________
$(function() {
 let header = $('.header');
 let hederHeight = header.height();
  
 $(window).scroll(function() {
   if($(this).scrollTop() > 1) {
    header.addClass('header_fixed');
    $('body').css({
       'paddingTop': hederHeight+'px'
    });
   } else {
    header.removeClass('header_fixed');
    $('body').css({
     'paddingTop': 0
    })
   }
 });
});

// Burger Menu______________________________________________________
$(document).ready(function($) {
	
	$('.burger-btn').on('click',function(){
    	$('.burger-menu').toggle();
    	$('.body').toggleClass('lock');
    	$('.burger-btn').toggleClass('active');
	});
});

// Open/Close Modal Window____________________________________________________
$(document).ready(function($) {
	$('.header__phone-link-btn').click(function() {
		$('.header__overlay').fadeIn();
		$('.header__modal-window').fadeIn();
		return false;
	});

	$('.header__overlay').click(function() {
		$('.header__overlay').fadeOut();
		$('.header__modal-window').fadeOut();
		$('form').trigger('reset');
		return false;
	});

	$('.header__modal-window-close-btn').click(function() {
		$('.header__overlay').fadeOut();
		$('.header__modal-window').fadeOut();
		$('form').trigger('reset');
		return false;
	});
	$('.header__modal-window-success-btn').click(function() {
		$('.header__overlay').fadeOut();
		$('.header__modal-window-success').fadeOut();
		return false;
	});	
});
// Sent form and validation_________________________________________________
$(document).ready(function($) {
	$('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });
    $('#content-checkout__wrapper-payment-btn').on('click', function(e) {
        e.preventDefault();
        $('#content-checkout__form').submit();
    });
	$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
	function valEl(el) {
        el.validate ({
			rules: {
				name: {
					required: true,
					regex: "[A-Za-z]{1,32}"
				},
				mail: {
	                required: true,
	                email: true
	            },
	            phone: {
	            	required: true,
	                digits: true,
	                minlength: 10,
	                regex: "[0-9]"
	            },
	            message: {
		            required: true
		        },
			},
			messages: {
				name: "Введите ваше имя латинскими буквами",
				mail: "Введите ваш e-mail правильно",
				phone: "Введите ваш номер в формате 7xxxxxxxxxx",
				message: "Пожалуйста заполните поле!",
				city: "Пожалуйста заполните поле!",
				street: "Пожалуйста заполните поле!",
				house: "Пожалуйста заполните поле!"
			},
			submitHandler: function(form) {
	            let $form = $(form);
	            let $formId = $(form).attr('id');
	            switch ($formId) {
	                case 'header__modal-window-form':
	                    $.ajax({
	                        type: $form.attr('method'),
	                        url: $form.attr('action'),
	                        data: $form.serialize()
	                     })
	                     .done(function() {
					          console.log('success');
					          $("#header__modal-window-success").fadeIn();
					          $('.header__modal-window').fadeOut();
					     })
	                     .fail(function() {
					          console.log('fail');
					          $("#header__modal-window-error").fadeIn();
					          $('.header__modal-window').fadeOut();
					     })
	                     .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                  }, 1100);
                        });
	                break;
	                case 'content__form':
		                $.ajax({
		                    type: $form.attr('method'),
		                    url: $form.attr('action'),
		                    data: $form.serialize()
						 })
						 .done(function() {
					          console.log('success');
					          $(".content__success").addClass('content__success_active')
					     })
	                     .fail(function() {
					          console.log('fail');
					          $(".content__error").addClass('content__error_active')
					     })
		                 .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                  }, 1100);
                        }); 
		            break;
		            case 'content-checkout__form':
		                $.ajax({
		                    type: $form.attr('method'),
		                    url: $form.attr('action'),
		                    data: $form.serialize()
						 })
						 .done(function() {
					          console.log('success');
					     })
	                     .fail(function() {
					          console.log('fail');
					     })
		                 .always(function() {
                                  console.log('Always');
                                  setTimeout(function() {
                                      $form.trigger('reset');
                                  }, 1100);
                        }); 
		            break;
	            };
	            return false;
	        }
		});
	};
	$('form').each(function() {
        valEl($(this));
    });
    $('#content-checkout__form').each(function() {
        valEl($(this));
    });
});

// Main-section Slider_________________________________________________
$(document).ready(function($) {
	$('.main-section__wrapper-info').slick({
		arrows:false,
		dots:true,
		dotsClass:'main-section__dots',
		slidesToShow:1,
		slidesToScroll:1,
		speed:1500,
		easing:'ease',
		infinite:true,
		initialSlide:0,
		autoplay:true,
		autoplaySpeed:2000,
		draggable:false,
		asNavFor:'.main-section__img-fav',
	});
	$('.main-section__img-fav').slick({
		arrows:false,
		slidesToShow:1,
		slidesToScroll:1,
		speed:1500,
		easing:'ease',
		infinite:true,
		initialSlide:0,
		autoplay:true,
		autoplaySpeed:2000,
		draggable:false,
		asNavFor:'.main-section__wrapper-info',
	});
});

// Scroll to section__________________________________________________
$(document).ready(function($){
	$('.main-section__arrow-down').on('click', function() {

	    let scrollName = $(this).attr('data-scroll'),
	    	scrollElem = $(scrollName),
	    	scrollTop = scrollElem.offset().top;

		$('html, body').animate({
		  scrollTop: scrollTop
		}, 700);
	});
});
 
// Team Slider_________________________________________________________
$(document).ready(function($){
	$('.team__wrapper-img-slider').slick({
		arrows:true,
		prevArrow:'.team__wrapper-prev',
		nextArrow:'.team__wrapper-next',
		dots:true,
		dotsClass:'team__dots',
		slidesToShow:1,
		slidesToScroll:1,
		speed:1500,
		easing:'ease',
		infinite:true,
		initialSlide:0,
		autoplay:true,
		autoplaySpeed:2000,
		draggable:false
	});
});

// Shop-category___________________________________________________

$(document).ready(function($){
	$('.products__category').on('click',function(){
	    var currTab = $(this).parent().index();

	    $('.products__category').removeClass('active');
	    $(this).addClass('active');
	})
});
	


