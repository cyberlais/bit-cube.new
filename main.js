import "./style.css"

import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"
// import Swiper and modules styles
import "swiper/css"
// import "swiper/css/navigation"
import "swiper/css/pagination"

// init Swiper:
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

document.addEventListener("DOMContentLoaded", function () {
	// Находим все элементы с классом swiper-child-pagination
	const childPaginations = document.querySelectorAll(".swiper-child-pagination")

	// Перебираем каждый элемент с классом swiper-child-pagination
	childPaginations.forEach(function (childPagination) {
		// Находим ближайший родительский элемент swiper-container
		const swiperContainer = childPagination.closest(".swiper-container")

		// Проверяем, если такой контейнер существует
		if (swiperContainer) {
			// Находим все элементы с классом swiper-banner внутри этого контейнера
			const banners = swiperContainer.querySelectorAll(".swiper-banner")

			// Перебираем каждый элемент с классом swiper-banner
			banners.forEach(function (banner) {
				// Вставляем элемент swiper-child-pagination перед элементом swiper-banner
				banner.parentNode.insertBefore(childPagination, banner)
			})
		}
	})
})
