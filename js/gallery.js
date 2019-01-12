function gallery_select(gallery, index, direction) {
	const items = gallery.getElementsByClassName('az-gallery-item');
	items[index].classList.remove('selected');
	index = index + direction;
	if (index < 0)               index = items.length - 1;
	if (index > items.length -1) index = 0;
	items[index].classList.add('selected');
	return index;
}

function gallery_init() {
	const galleries = document.getElementsByClassName('az-gallery');
	for (const gallery of galleries) {
		let index = 0;
		// Left buttons
		const left_btns  = gallery.getElementsByClassName('az-gallery-btn-left');
		for (const left_btn of left_btns) {
			left_btn.addEventListener('click', (evt) => {
				index = gallery_select(gallery, index, -1);
			});
		}
		// Right buttons
		const right_btns = gallery.getElementsByClassName('az-gallery-btn-right');
		for (const right_btn of right_btns) {
			right_btn.addEventListener('click', (evt) => {
				index = gallery_select(gallery, index, 1);
			});
		}
	}
}
