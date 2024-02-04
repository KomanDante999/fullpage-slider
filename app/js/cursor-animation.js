// Cursor
export function cursorAnimation(gsap) {

	const body = document.querySelector('body');
	const cursor = document.getElementById('cursor');
	const links = document.querySelectorAll('.cursor-target')

	let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

	function mousePos(event) {
		mouseX = event.pageX
		mouseY = event.pageY
	}

	gsap.to({}, 0.01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 7;
			posY += (mouseY - posY) / 7;
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY,
				}
			})
		}
	})

	if (body.classList.contains('hasHover')) {    // проверка использования мыши из mouse-or-touch.js

		links.forEach(link => {
			link.addEventListener('mouseover', () => {
				cursor.classList.add('cursor-active')
			});
			link.addEventListener('mouseout', () => {
				cursor.classList.remove('cursor-active')
			});
		});

		body.addEventListener('mousemove', event => {
			mousePos(event);
			cursor.classList.remove('cursor-hidden')
		});
		body.addEventListener('mouseout', () => {
			cursor.classList.add('cursor-hidden')
		});
	}
}
