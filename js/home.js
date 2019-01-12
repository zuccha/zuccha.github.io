const WIDTH_COLLAPSE = 500;

function update_title() {
	if (document.body.clientWidth < WIDTH_COLLAPSE) {
		const title = document.getElementById('az-home-title');
		title.innerHTML = 'AZ';
	} else {
		const title = document.getElementById('az-home-title');
		title.innerHTML = 'Amedeo Zucchetti';
	}
}

function update_menus() {
	let menu_titles = document.getElementsByClassName('az-menu-title');
	let menu_icons  = document.getElementsByClassName('az-menu-icon');
	if (document.body.clientWidth < WIDTH_COLLAPSE) {
		for (const menu_title of menu_titles) {
			menu_title.classList.add('az-hidden');
		}
		for (const menu_icon of menu_icons) {
			menu_icon.classList.remove('az-hidden');
		}
	} else {
		for (const menu_title of menu_titles) {
			menu_title.classList.remove('az-hidden');
		}
		for (const menu_icon of menu_icons) {
			menu_icon.classList.add('az-hidden');
		}
	}
}

function init_menus() {
	let menus = document.getElementById('az-menus');
	for (let menu of menus.children) {
		menu.addEventListener('click', (evt) => {
			// Hide all pages
			for (let menu of menus.children) {
				menu.classList.remove('az-selected');
				const id   = menu.id.replace('menu', 'page');
				const page = document.getElementById(id);
				page.classList.remove('az-selected');
			}
			// Show clicked page
			menu.classList.add('az-selected');
			const id   = menu.id.replace('menu', 'page');
			const page = document.getElementById(id);
			page.classList.add('az-selected');
			window.localStorage.setItem('az-menu-selected', menu.id);
		});
	}
}

function init_pages() {
	let menu_id = window.localStorage.getItem('az-menu-selected');
	if (!menu_id) menu_id = 'az-menu-about';
	const menu = document.getElementById(menu_id);
	menu.click();
}

function init_articles() {
	let articles = document.getElementsByClassName('az-article');
	for (const article of articles) {
		const btn  = article.getElementsByClassName('az-article-btn')[0];
		const body = article.getElementsByClassName('az-article-body')[0];
		btn.addEventListener('click', evt => {
			// Toggle +/- icon
			if (btn.classList.contains('fa-plus-circle')) {
				btn.classList.remove('fa-plus-circle');
				btn.classList.add('fa-minus-circle');
			} else {
				btn.classList.remove('fa-minus-circle');
				btn.classList.add('fa-plus-circle');
			}
			// Open/close article
			body.classList.toggle('az-open');
		});
	}
}

window.onresize = function() {
	update_title();
	update_menus();
}

window.onload = function() {
	// Initialize menu buttons
	init_menus();
	init_pages();
	init_articles();
	update_title();
	update_menus();
	// Initialize gallery buttons
	gallery_init();
	// Unhide content
	const main = document.getElementById('az-main');
	main.classList.remove('az-hidden');
}
