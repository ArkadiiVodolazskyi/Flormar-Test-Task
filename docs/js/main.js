
const loadProducts = async (url) => {
	let products = null;
	let error = null;

	try {
		const data = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify()
		});
		if (!data.ok) {
			throw Error('There was an error!');
		}
		products = await data.json();
	}
	catch(err) {
		error = err.message;
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
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					draggable: true,
					swipe: true,
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
					readMoreText.innerText = `Read less`;
				} else {
					textBlock.classList.add('wrapped_text');
					readMore.classList.remove('active');
					readMoreText.innerText = `Read more`;
				}
			}, true);
		}

	})();

}, true);

window.addEventListener('load', () => {

	// Globals
	const html = document.querySelector('html');
	const body = document.body;
	const overlay = document.getElementById('overlay');
	const main_header = document.getElementById('main_header');
	const mobile_header = document.getElementById('mobile_header');
	const toggleMobileHeader = document.getElementById('expand_mobile_menu');

	// Smooth anchors
	(function() {
		$("a[href^='#']").on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({
					scrollTop: $(this.hash).offset().top
				}, 400, function(){
			});
		});
	})();

	// Loaded animations
	(function() {
		const loading = document.querySelectorAll('.loading');
		loading.forEach(el => {
			setTimeout(() => {
				el.classList.remove('loading');
			}, 500);
		});
	})();

	// Output products
	(function() {
		const productWrapper = document.querySelector('.product_wrapper .cards');

		const outputProducts = async () => {
			const products = await loadProducts('https://www.wona.co.il/test_8192735.php');

			if (products.length) {
				products.forEach(product => {

					// Create product card
					const card = document.createElement('a');
					card.classList.add('card');
					card.href = product.link;

					card.innerHTML += product.image ? `
						<div class="thumb">
							<img src="${product.image}" alt="product_thumb">
						</div>` : '';

					card.innerHTML += product.title ? `
						<h4 class="name">
							${product.title}
						</h4>` : '';

					if (product.price || product.quantity) {
						const attributes = document.createElement('div');
						attributes.classList.add('attributes');

						attributes.innerHTML += product.price ? `
							<div class="price">
								<span class="value">${product.price}</span>
								<span class="units">₪</span>
							</div>` : '';

						attributes.innerHTML += product.quantity ? `
							<div class="quantity">
								<span class="value">${product.quantity}</span>
								<span class="units">םיעבצ</span>
							</div>` : '';

						card.appendChild(attributes);
					}

					card.innerHTML += `
						<button class="quick_review">
							סקירה מהירה
						</button>`;

					// Append card
					productWrapper.appendChild(card);

				});
			} else {
				productWrapper.innerHTML = `<p class="no_products">No products found :(</p>`
			}

			productWrapper.classList.remove('loading_products');
		};

		outputProducts();
	})();

	// Toggle moble header
	(function() {
		toggleMobileHeader.addEventListener('click', () => {
			overlay.classList.toggle('active');
			mobile_header.classList.toggle('active');
			toggleMobileHeader.classList.toggle('active');
			html.classList.toggle('discroll');

			// Click on overlay
			overlay.addEventListener('click', () => {
				overlay.classList.remove('active');
				mobile_header.classList.remove('active');
				toggleMobileHeader.classList.remove('active');
				html.classList.remove('discroll');
			}, true);

			// Click on links
			const mobileLinks = document.querySelectorAll('#mobile_header nav a');
			mobileLinks.forEach(link => {
				link.addEventListener('click', () => {
					overlay.classList.remove('active');
					mobile_header.classList.remove('active');
					toggleMobileHeader.classList.remove('active');
					html.classList.remove('discroll');
				}, true);
			});
		}, true);
	})();
}, true);
