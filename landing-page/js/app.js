let sections = document.querySelectorAll('section');
let timerS = null;

/**
 * End Global Variables
 * Start Functions
 *
 */
// used when adding new sections
const updateSec = () => {
	sections = document.querySelectorAll('section');
};
// used for adding smooth scroll to an element, in this case, added to the parent nav instead of children li
const addClickEl = ((element) => {
	element.addEventListener('click', (evt) => {
		if (evt.target.nodeName === 'LI') {
			const viewSection = document.querySelector(`[data-nav='${evt.target.id}']`);
			viewSection.scrollIntoView({ behavior: 'smooth' });
		}
	});
})(document.querySelector('#navbar__list'));
//used for adding mouse over event listener to nav bar
const addMouseOverEl = ((ele) => {
	ele.addEventListener('mouseover', () => {
		if (timerS !== null) {
			clearTimeout(timerS);
		}
		ele.style.display = 'initial';
	});
})(document.querySelector('.page__header'));
const addMouseOutEl = ((ele) => {
	ele.addEventListener('mouseout', () => {
		ele.style.display = 'none';
	});
})(document.querySelector('.page__header'));
// dynamically add navbar, used when page is refresed or when a new section is generated
const addNavBar = (() => {
	let parent = document.getElementById('navbar__list');
	let lis = document.createDocumentFragment();
	sections.forEach((sec) => {
		if (!document.getElementById(sec.dataset.nav)) {
			const newElement = document.createElement('li');
			newElement.id = sec.dataset.nav;
			newElement.innerText = sec.dataset.nav;
			newElement.className = 'menu__link';
			lis.appendChild(newElement);
		}
	});
	parent.appendChild(lis);
	document.getElementById('Section 1').classList.add('active');
})();

// add event listener to the add-new-section button
const addBtnEl = (() => {
	let btn = document.getElementById('addsection');
	btn.addEventListener('click', () => {
		let parent = document.querySelector('main');
		let newElement = document.createElement('section');
		newElement.id = 'section' + (sections.length + 1);
		newElement.dataset.nav = 'section ' + (sections.length + 1);
		newElement.innerHTML = `<div class="landing__container">
        <h2>Section ${sections.length + 1}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>`;
		parent.appendChild(newElement);
		updateSec();
		addNavBar();
	});
})();

const isInViewPort = (element) => {
	let bound = element.getBoundingClientRect();
	return (
		bound.top >= 0 &&
		bound.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
};
// add active to nav bar
const setNavActive = (ele) => {
	ele.classList.add('active');
};
const cancelNvaActive = (ele) => {
	ele.classList.remove('active');
};
// Add class 'active' to section when near top of viewport
const setSectionActive = () => {
	sections.forEach((sec) => {
		let navEle = document.getElementById(`${sec.dataset.nav}`);
		sec.classList.remove('your-active-class');
		cancelNvaActive(navEle);
		if (isInViewPort(sec)) {
			sec.classList.add('your-active-class');
			setNavActive(navEle);
		}
	});
};

window.addEventListener('scroll', (evt) => {
	let headerNav = document.querySelector('.page__header');
	headerNav.style.display = 'initial';
	if (timerS !== null) {
		clearTimeout(timerS);
	}
	timerS = setTimeout(() => {
		headerNav.style.display = 'none';
		setSectionActive();
	}, 500);
});
/**
 * End Functions
 *
 *
 */

/**
 * End Functions
 *
 *
 */
