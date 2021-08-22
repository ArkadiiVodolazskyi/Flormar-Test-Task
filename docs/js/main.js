
const loadProducts = async (url) => {
	const products = [];
	const error = null;

	try {
		const data = await fetch(url, {
			method: 'GET',
			mode: 'no-cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify()
		});
		if (!data.ok) {
			throw Error('There was an error!');
		}
		products.value = await data.json();
	}
	catch(err) {
		error.value = err.message;
	}

	return products;
}

document.addEventListener('DOMContentLoaded', () => {

	// Init slick slider
	const bannerSlider = document.querySelector('.banner_main .slider');
	$(bannerSlider).slick({
		rtl: true,
		lazyLoad: 'progressive',
		arrows: false,
		dots: true,
		appendDots: $('.banner_main .slider_nav'),
		speed: 500,
		draggable: false,
		swipe: false,
		focusOnSelect: false,
		infinite: false,
		// autoplay: true,
		autoplaySpeed: 2000,
		// variableWidth: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				},
			}
		],
	});

	// Toggle text
	(function() {
		const textBlock = document.querySelector('.products .info .text');

		if (textBlock.offsetHeight > 60) {

			// Add button
			const readMore = document.createElement('button');
			readMore.classList.add('toggle_text');
			readMore.innerHTML = `
				<span class='readMoreText'>Read more</span>
				<svg width="10" height="6"><use xlink:href="./img/icons.svg#arrow_down"></use></svg>`;
			textBlock.after(readMore);

			// Hide text
			textBlock.classList.add('wrapped_text');
			setTimeout(() => {
				textBlock.style.transition = 'all 0.8s ease-in-out';
			}, 500);
			const readMoreText = readMore.querySelector('.readMoreText');

			// Add interaction
			readMore.addEventListener('click', () => {
				if (textBlock.classList.contains('wrapped_text')) {
					textBlock.classList.remove('wrapped_text');
					readMore.classList.add('active');
					setTimeout(() => {
						readMoreText.innerText = `Read less`;
					}, 200);
				} else {
					textBlock.classList.add('wrapped_text');
					readMore.classList.remove('active');
					setTimeout(() => {
						readMoreText.innerText = `Read more`;
					}, 200);
				}
			}, true);
		}

	})();
}, true);

window.addEventListener('load', () => {

	// Globals
	const body = document.body;
	const overlay = document.getElementById('overlay');
	const main_header = document.getElementById('main_header');
	const mobile_header = document.getElementById('mobile_header');
	const toggleMobileHeader = document.getElementById('expand_mobile_menu');

	// Loaded animations
	(function() {
		const loading = document.querySelectorAll('.loading');
		loading.forEach(el => {
			setTimeout(() => {
				el.classList.remove('loading');
			}, 500);
		});
	})();

	// Get products
	(function() {
		const products = loadProducts('https://www.wona.co.il/test_8192735.php');
		console.log(products);
	})();

	// Toggle moble header
	(function() {
		toggleMobileHeader.addEventListener('click', () => {
			overlay.classList.toggle('active');
			mobile_header.classList.toggle('active');
			toggleMobileHeader.classList.toggle('active');
			body.classList.toggle('discroll');

			// Click on overlay
			overlay.addEventListener('click', () => {
				overlay.classList.remove('active');
				mobile_header.classList.remove('active');
				toggleMobileHeader.classList.remove('active');
				body.classList.remove('discroll');
			}, true);
		}, true);
	})();
}, true);
