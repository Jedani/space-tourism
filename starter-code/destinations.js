const data = async function () {
	const response = await fetch("data.json");

	if (response.status !== 200) {
		throw new Error("can't fetch data from resource");
	}

	const data = await response.json();

	return data;
};

data()
	.then((data) => strip(data))
	.catch((err) => err.message);

function strip(data) {
	let pages = data.destinations;

	const tablist = document.querySelector('[role="tablist"]');
	const tabs = document.querySelectorAll('[role="tab"]');

	let tabFocus = 0;
	tablist.addEventListener("keydown", (e) => {
		const leftKey = 37;
		const rightKey = 39;

		if (e.keyCode === leftKey || e.keyCode === rightKey) {
			tabs[tabFocus].setAttribute("tabindex", -1);
		}

		if (e.keyCode === rightKey) {
			tabFocus++;
			if (tabFocus >= tabs.length) {
				tabFocus = 0;
			}
		}

		if (e.keyCode === leftKey) {
			tabFocus--;
			if (tabFocus < 0) {
				tabFocus = tabs.length - 1;
			}
		}

		tabs[tabFocus].setAttribute("tabindex", 0);
		tabs[tabFocus].focus();
	});

	tabs.forEach((tab) => {
		tab.addEventListener("click", (e) => {
			const targetTab = e.target;
			const select = targetTab.getAttribute("aria-controls");

			const main = document.getElementById("main");
			const children = Array.from(main.children);

			const planets = children[1];
			const att = Array.from(planets.children);

			let title = children[3];
			const child = title.childNodes;

			const desc = child[5];
			const gChild = desc.childNodes;

			const div = gChild[1];
			let s = div.childNodes;

			const div2 = gChild[3];
			let v = div2.childNodes;

			if (select === "moon-tab") {
				let curr = att[0];
				curr.srcset = pages[0].images.webp;

				let img = att[1];
				img.src = pages[0].images.png;

				child[1].innerText = pages[0].name;

				child[3].innerText = pages[0].description;

				s[3].innerText = pages[0].distance;
				v[3].innerText = pages[0].travel;
			}

			if (select === "mars-tab") {
				let curr = att[0];
				curr.srcset = pages[1].images.webp;

				let img = att[1];
				img.src = pages[0].images.png;

				child[1].innerText = pages[1].name;

				child[3].innerText = pages[1].description;

				s[3].innerText = pages[1].distance;
				v[3].innerText = pages[1].travel;
			}

			if (select === "europa-tab") {
				let curr = att[0];
				curr.srcset = pages[2].images.webp;

				let img = att[1];
				img.src = pages[0].images.png;

				child[1].innerText = pages[2].name;

				child[3].innerText = pages[2].description;

				s[3].innerText = pages[2].distance;
				v[3].innerText = pages[2].travel;
			}

			if (select === "titan-tab") {
				let curr = att[0];
				curr.srcset = pages[3].images.webp;

				let img = att[1];
				img.src = pages[0].images.png;

				child[1].innerText = pages[3].name;

				child[3].innerText = pages[3].description;

				s[3].innerText = pages[3].distance;
				v[3].innerText = pages[3].travel;
			}
		});
	});
}
