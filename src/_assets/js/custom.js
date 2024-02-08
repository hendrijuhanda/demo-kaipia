/*  ------------------------------------
      KaiPia Template - Custom Script

	  Author		: Hendri Juhanda
	  Author URL	: http://juhanda.net

	  Created		: 18 April 2014
	  Last Modified	: 18 April 2014

	  Copyright ©2014
	------------------------------------  */

$(document).ready(function () {
	/*-- SMOOTH SCROLL --*/
	$("a.smooth-scroll").click(function (e) {
		e.preventDefault();

		var attr = $(this).attr("data-scroll-offset");

		if (typeof attr !== "undefined" && attr !== false) {
			var offset = $(this).data("scroll-offset");
		} else {
			var offset = 100;
		}

		$(document).scrollTo(this.hash, 1000, { offset: -offset, easing: "swing" });
	});

	/*-- NAV LINK COLLAPSE --*/
	function navbarToggle() {
		if ($(window).width() <= 767) {
			$(".smooth-scroll").addClass("nav-link");
		} else {
			$("a.nav-link").removeClass("nav-link");
		}

		$("a.nav-link").on("click", function () {
			$(".navbar-collapse").collapse("hide");
		});
	}

	navbarToggle();

	/*-- SEARCH TOGGLE --*/
	$("#search-toggle").click(function (e) {
		e.preventDefault();

		var $el = $(this).parent();

		if ($el.hasClass("open")) {
			$el.removeClass("open");
		} else {
			$el.addClass("open");
		}
	});

	/*-- HOME SLIDER ANIMATION --*/
	function slideAnim() {
		$("#home-slider .animate").each(function () {
			var anim = $(this).data("animate");

			$(this)
				.addClass(anim + " animated")
				.one(
					"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
					function () {
						$(this).removeClass(anim + " animated");
					}
				);
		});
	}

	slideAnim();

	$("#home-slider").on("slid.bs.carousel", function () {
		slideAnim();
	});

	/*-- SCROLL ANIMATION --*/
	$(".scrollanim").each(function () {
		var $body = $("body"),
			anim = $(this).data("animate");

		$(this).waypoint(
			function () {
				$body.css("overflow-x", "hidden");

				$(this)
					.addClass(anim + " animated")
					.one(
						"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
						function () {
							$body.css("overflow-x", "visible");
							$(this).removeClass(
								anim +
									" animated scrollanim delay-1 delay-2 delay-3 delay-4 delay-5 delay-6 delay-7 delay-8 delay-9 delay-10"
							);
						}
					);
			},
			{ offset: "80%", triggerOnce: true }
		);
	});

	/*-- COLLAPSE INDICATOR --*/
	$(".custom-collapse > .panel").each(function () {
		var $this = $(this);

		if ($this.children(".panel-collapse").hasClass("in")) {
			$this.find('a[data-toggle="collapse"]').removeClass("collapsed");
		} else {
			$this.find('a[data-toggle="collapse"]').addClass("collapsed");
		}
	});

	/*-- PORTFOLIO FILTER --*/
	const Shuffle = window.Shuffle;
	var $grid = document.querySelector(".grid");

	if ($grid) {
		const shuffleInstance = new Shuffle($grid, {
			itemSelector: ".portfolio-shuffle",
			speed: 500,
		});

		shuffleInstance.on("shuffle:layout", () => {
			refresh();
		});

		$(".portfolio-control .filter > a").click(function (e) {
			e.preventDefault();

			$(".portfolio-control .filter > a").parent().removeClass("active");
			$(".portfolio-control .filter > a").removeClass("active");
			$(this).parent().addClass("active");
			$(this).addClass("active");

			var category = $(this).parent().attr("data-group");

			shuffleInstance.filter(category);
		});

		$(window).bind("load", function () {
			$(".portfolio-control .filter > a.active").click();
		});
	}

	/*-- IMAGE LIGHTBOX --*/
	var markup =
			'<div class="mfp-figure">' +
			'<div class="mfp-close"></div>' +
			'<div class="mfp-img-wrap">' +
			'<div class="mfp-img"></div>' +
			'<div class="mfp-bottom-bar">' +
			'<div class="mfp-title"></div>' +
			'<div class="mfp-counter"></div>' +
			"</div>" +
			"</div>" +
			"</div>",
		closeBtn = '<span title="Close" class="mfp-close mfp-custom-close"></span>';

	$(".image-link").magnificPopup({
		type: "image",
		mainClass: "mfp-fade",
		removalDelay: 500,
		image: {
			markup: markup,
			verticalFit: true,
		},
		closeMarkup: closeBtn,
	});

	$(".gallery").each(function () {
		$(this).magnificPopup({
			delegate: ".image-gallery",
			type: "image",
			mainClass: "mfp-fade",
			removalDelay: 500,
			image: {
				markup: markup,
				verticalFit: true,
			},
			gallery: {
				enabled: true,
				arrowMarkup:
					'<span title="%title%"class="mfp-control mfp-control-%dir%"></span>',
				tCounter: '<span class="mfp-counter">Image %curr% of %total%</span>',
				tPrev: "Previous",
				tNext: "Next",
			},
			closeMarkup: closeBtn,
		});
	});

	/*-- RESPONSIVE VIDEO --*/
	$(".video-wrap").fitVids();

	/*-- AFFIX NAV --*/
	$("#doc-nav").affix({
		offset: {
			top: 100,
			bottom: function () {
				return (this.bottom = $(".main-footer").outerHeight(true));
			},
		},
	});

	/*-- TOOLTIP/POPOVER --*/
	$('*[data-toggle="tooltip"]').tooltip();
	$('*[data-toggle="popover"]').popover();

	/*-- PRETTIFY --*/
	// prettyPrint();

	/*-- BACK TO TOP --*/
	$("#backtop").click(function (e) {
		e.preventDefault();
		$("body,html").animate({ scrollTop: 0 }, 1000);
	});

	$(window).scroll(function () {
		var viewPort = $(window).innerHeight();

		if ($(this).scrollTop() > viewPort - 1) {
			$(".back-top").fadeIn();
			$("#backtop").addClass("animated bounceIn");
		} else {
			$(".back-top").fadeOut();
		}
	});

	/*-- PARALLAX BACKGROUND --*/
	$('*[data-bg="parallax"]').each(function () {
		var prlxBg = $(this),
			elOffset = prlxBg.offset().top - $(window).innerHeight(),
			bgAttr = prlxBg.attr("data-bg-speed");

		if (typeof bgAttr !== "undefined" && bgAttr !== false) {
			var speed = bgAttr;
		} else {
			var speed = 25;
		}

		$(window).bind("scroll load", function () {
			var bgPosOffY = $(window).scrollTop() - elOffset,
				bgPos = "50%" + bgPosOffY / speed + "px";

			prlxBg.css({
				"background-attachment": "fixed",
				"background-position": bgPos,
			});
		});
	});

	/*-- SCROLL TO PORTFOLIO ITEM --*/
	$("a.scroll-to-item").click(function (e) {
		e.preventDefault();
		$(document).scrollTo("#portfolio-item", 1000, {
			offset: -60,
			easing: "swing",
		});
	});

	/*-- CONTACT FORM --*/
	$(".form-validate").each(function () {
		$(this).parsley({
			showErrors: false,
			listeners: {
				onFieldSuccess: function (elem) {
					elem.parent().addClass("has-success");
					elem.parent().removeClass("has-error");
				},

				onFieldError: function (elem) {
					elem.parent().addClass("has-error");
					elem.parent().removeClass("has-success");
				},
			},
		});

		$(this).submit(function (e) {
			var contactForm = $(this),
				submitButton = $(this).find(".submit-btn");

			if (!$(this).parsley("isValid")) {
				return false;
			} else {
				var cacheContent = submitButton.html(),
					cacheClass = submitButton.attr("class");

				var successMsg = submitButton.data("success-msg"),
					errorMsg = submitButton.data("error-msg");

				function initialBtn() {
					setTimeout(function () {
						submitButton
							.removeClass("btn-success btn-danger")
							.addClass(cacheClass)
							.html(cacheContent);
					}, 2000);
				}

				submitButton.html("Sending message...").blur();

				initialBtn();
			}

			return false;
		});
	});

	/*-- REFRESH --*/
	function scrollSpyRefresh() {
		$('[data-spy="scroll"]').each(function () {
			$(this).scrollspy("refresh");
		});
	}

	var timer;

	var refresh = function () {
		scrollSpyRefresh();
		$.waypoints("refresh");
	};

	$(window).bind("scroll", function () {
		clearTimeout(timer);
		timer = setTimeout(refresh, 250);
	});

	$(window).resize(function () {
		navbarToggle();
	});
});
