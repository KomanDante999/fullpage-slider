// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
import { watchForHover } from '../js/service/mouse-or-touch.js'
import { cursorAnimation } from '../js/cursor-animation.js'
import { modalWindow } from '../js/service/micromodal.js'
import { gsap, Power2 } from 'gsap'
import { Swiper } from 'swiper'
import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper/modules'
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation])

document.addEventListener('DOMContentLoaded', () => {
	const
		DesktopLG = 1360,
		DesktopMD = 1200,
		DesktopSM = 964,
		TabletLG = 800,
		TabletMD = 750,
		TabletSM = 635,
		MobilLG = 535,
		MobilMD = 480,
		MobilSM = 320

	// mouse or touch
	watchForHover();
	cursorAnimation(gsap);
	// Modal
	modalWindow();

	// SWIPER
	const VIEWPORT = {
		w: window.innerWidth,
		h: window.innerHeight,
	};
	let sliderSpeed = 0;
	let gearSpeed = 0;

	function speedAnimation() {
		if (VIEWPORT.w > TabletLG) {
			sliderSpeed = 2000
			gearSpeed = 2.8
		}
		if (VIEWPORT.w <= TabletLG && VIEWPORT.w > TabletMD) {
			sliderSpeed = 1500
			gearSpeed = 2.5
		}
		if (VIEWPORT.w <= TabletMD) {
			sliderSpeed = 1000
			gearSpeed = 2.5
		}
	}
	speedAnimation();

	window.addEventListener('resize', () => {
		VIEWPORT.w = window.innerWidth;
		VIEWPORT.h = window.innerHeight;
		speedAnimation()
	});

	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: sliderSpeed,
		parallax: true,
		pagination: {
			el: '.counter-total__total',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				let totalRend = total >= 10 ? `${total}` : `0${total}`
				return totalRend
			},
		}
	})

	const swiperTEXT = new Swiper('.slider-text', {
		loop: false,
		speed: sliderSpeed,
		// parallax: true,
		mousewheel: {
			invert: false,
			sensitivity: 1,  // чувствительность колеса мыши
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
			dynamicMainBullets: 1,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,

		},
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
	})

	swiperIMG.controller.control = swiperTEXT
	swiperTEXT.controller.control = swiperIMG

	// Gear
	let gear = document.querySelector('.gear')

	swiperTEXT.on('slideNextTransitionStart', function () {
		gsap.to(gear, gearSpeed, {
			rotation: '+=60',
			ease: Power2.easeOut,
		})
	})
	swiperTEXT.on('slidePrevTransitionStart', function () {
		gsap.to(gear, gearSpeed, {
			rotation: '-=60',
			ease: Power2.easeOut,
		})
	})

	// Counter
	let elCounterTotal = document.querySelector('.counter-total__counter')
	let elCounter = document.querySelector('.counter__counter')

	swiperTEXT.on('slideChange', function () {
		let index = swiperTEXT.realIndex + 1;
		let indexRend = index >= 10 ? `${index}` : `0${index}`

		// counter-total
		gsap.to(elCounterTotal, 0.3, {
			force3D: true,
			y: -25,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function () {
				gsap.to(elCounterTotal, 0.1, {
					force3D: true,
					y: 15,
				});
				elCounterTotal.innerHTML = indexRend;
				elCounter.innerHTML = indexRend;
			},
		})
		gsap.to(elCounterTotal, 0.3, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: 0.5,
		})
	})


})

