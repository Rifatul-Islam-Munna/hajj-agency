(function($) {
	'use strict';

		/*PRELOADER JS*/		
		$(window).on('load', function() { 
			$('.preloader_wrap').fadeOut();
			$('.preloader_wrap').delay(350).fadeOut('slow'); 
		}); 
				
		/*END PRELOADER JS*/
		
		jQuery(document).ready(function($) {
						
			//Mobile Menu Js Start //
			$("#main-menu").meanmenu({
				meanMenuContainer: ".mobile-menu",
				meanScreenWidth: "1199",
				meanExpand: ['<i class="fa-solid fa-plus"></i>'],
			});

			// Sidebar Toggle Js Start //
			$(".offcanvas__close,.offcanvas__overlay").on("click", function () {
				$(".offcanvas__info").removeClass("info-open");
				$(".offcanvas__overlay").removeClass("overlay-open");
			});
			
			$(".widget_menu_icon").on("click", function () {
				$(".offcanvas__info").addClass("info-open");
				$(".offcanvas__overlay").addClass("overlay-open");
			});


			/*START Popup Searchbox JS*/

			$('.search_btn').on('click', function(){
				var menu = $(this).attr('data-menu');
				$(menu).toggleClass('popupsbox_active');			
			});

			$('.popup_searchbox_wrapper').on('click', function(event){	
				if ( $(event.target).hasClass('popup_searchbox_wrapper') ) {
					$('.popupsbox_active').removeClass('popupsbox_active');
				}
			});
		
			$('.popup_close').on('click', function(event){	
				$('.popupsbox_active').removeClass('popupsbox_active');			
			});

  	
			/*END Popup Searchbox JS*/

			/*START Mini Cart JS*/

			$('.cart_icon').on('click', function(){
				var menu = $(this).attr('data-menu');
				$(menu).toggleClass('min_cart_active');			
			});

			$('.min_cart_wrapper').on('click', function(event){	
				if ( $(event.target).hasClass('min_cart_wrapper') ) {
					$('.min_cart_active').removeClass('min_cart_active');
				}
			});
		
			$('.cart_close').on('click', function(event){	
				$('.min_cart_active').removeClass('min_cart_active');			
			});

		
			/*END Mini Cart JS*/		

			/*START Home Slider*/	
			var homeSlider = new Swiper('.home-slider-active', {
				loop: true,
				slidesPerView: 1,
				grabCursor: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				effect: 'fade', // 'fade', 'cube', 'coverflow', 'flip'
				fadeEffect: {
					crossFade: true
				},
				navigation: {
					nextEl: '.rev_next',
					prevEl: '.rev_prev',
				},
				pagination: {
					el: '.home-slider .swiper-pagination',
					clickable: true,			
				}
			});
			/*END Home Slider*/

			/*Popup Video*/
			$('.prayer_btn').magnificPopup({
					type: 'iframe',
					iframe: {
						patterns: {
							youtube: {
								index: 'youtube.com/',
								id: 'v=',
								src: 'https://www.youtube.com/embed/%id%?autoplay=1'
							}
						}
					}
				});


			/*Counter */
			$('.counter-up').on('inview', function(event, visible, visiblePartX, visiblePartY) {
				if (visible) {
					$(this).find('span.counter').each(function () {
						var $this = $(this);
						$({ Counter: 0 }).animate({ Counter: $this.text() }, {
							duration: 2000,
							easing: 'swing',
							step: function () {
								$this.text(Math.ceil(this.Counter));
							}
						});
					});
					$(this).unbind('inview');
				}
			});					
		});
			

		/*Testimonials Slider*/
		var swiper = new Swiper(".testimonials-slider", {
			loop: true,
			grabCursor: true,
			spaceBetween: 30,
			slidesPerView: 1,
			centeredSlides: true,
			autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			},
			pagination: {
			el: ".swiper-pagination",
			clickable: true,
			},
			navigation: {
			nextEl: ".rev_next",
			prevEl: ".rev_prev",
			},
			breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 1,
			},
			},
		});
		/*END Testimonials Slider*/		
		
		//------------- DETAIL ADD - MINUS COUNT ORDER -------------//
		$(".btn-number").on("click", function () {

			var $button = $(this);
			var oldValue = $button.closest('.quantity_option').find("input.quntity-input").val();

			if ($button.text() == "+") {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				// Don't allow decrementing below zero
				if (oldValue > 0) {
					var newVal = parseFloat(oldValue) - 1;
				} else {
					newVal = 0;
				}
			}

			$button.closest('.quantity_option').find("input.quntity-input").val(newVal);

		});

		/* WOW */
		new WOW().init();

})(jQuery);
