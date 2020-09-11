const menuButton = document.querySelectorAll('.menu-button');
const menu = document.querySelector('.dropdown');
const container = document.querySelector('.container');
const content = document.querySelector('.content');
const slider = document.querySelector('.slider');
const sliderImages = document.querySelectorAll('.slide-image');
const slideNavigation = document.querySelectorAll('.arrow');
const dotContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dot');

let currentImage = 0;

const changeColor = function changeContainerColorOnMenuHover(e) {
	const currentColor = getComputedStyle(e.target).backgroundColor;
	container.style.backgroundColor = currentColor;
};

const updateContent = function updatePageContent(e) {
	const textContent = content.firstElementChild;
	slider.style.display = 'none';
	dotContainer.style.display = 'none';

	if (e.target.classList.contains('home-icon')) {
		textContent.style.color = '#de8e69';
		textContent.innerText = '';
		slider.style.display = '';
		dotContainer.style.display = '';
	}
	if (e.target.classList.contains('store-icon')) {
		textContent.style.color = '#d2948e';
		textContent.innerText = 'STORE';
	}
	if (e.target.classList.contains('about-icon')) {
		textContent.style.color = '#905dbf';
		textContent.innerText = 'ABOUT';
	}
	if (e.target.classList.contains('contact-icon')) {
		textContent.style.color = '#4c8eaf';
		textContent.innerText = 'CONTACT';
	}
};

const slideImage = function slideImage(n) {
	currentImage = currentImage + n;
	if (currentImage > sliderImages.length - 1) {
		currentImage = 0;
	} else if (currentImage < 0) {
		currentImage = sliderImages.length - 1;
	}
	for (let i = 0; i < sliderImages.length; i++) {
		sliderImages[i].classList.remove('active-image');
	}
	sliderImages[currentImage].classList.add('active-image');
	dots.forEach((dot) => dot.classList.remove('active-dot'));
	dots[currentImage].classList.add('active-dot');
};

const dotTrigger = function triggerDotOnClick(e) {
	if (e.target.classList.contains('active-dot')) {
		return;
	} else {
		currentImage = [ ...dots ].indexOf(e.target);
		slideImage(0);
	}
};

menuButton.forEach((button) =>
	button.addEventListener('click', (e) => {
		changeColor(e);
		updateContent(e);
	})
);

slideNavigation.forEach((arrow) => {
	arrow.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-angle-left')) {
			slideImage(-1);
		} else {
			slideImage(1);
		}
	});
});

dots.forEach((dot) => dot.addEventListener('click', dotTrigger));

setInterval(slideImage, 5000, 1);
