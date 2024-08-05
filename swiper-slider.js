import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"
// import Swiper and modules styles
import "swiper/css"
// import "swiper/css/navigation"
import "swiper/css/pagination"

// init Swiper:
export function initSwiper() {
	const swiper = new Swiper(".swiper", {
		// configure Swiper to use modules
		modules: [Navigation, Pagination],
		centeredSlides: true,
		loop: true,
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	})

	const swiperChild = new Swiper(".swiper-child", {
		// configure Swiper to use modules
		modules: [Navigation, Pagination],
		centeredSlides: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-child-button-next",
			prevEl: ".swiper-child-button-prev",
		},
		pagination: {
			el: ".swiper-child-pagination",
		},
	})
}
