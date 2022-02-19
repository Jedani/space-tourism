const data = async function () {
	const response = await fetch("data.json");

	if (response.status !== 200) {
		throw new Error("can't fetch data from resource");
	}

	const data = await response.json();

	return data.technology;
};

data()
	.then((data) => strip(data))
	.catch((err) => err.message);

function strip(data) {
	let techPages = data;

	const tablist = document.querySelector('[role="tablist"]');
	const tabs = document.querySelectorAll('[role="tab"]');

	let tabFocus = 0;
	tablist.addEventListener("keydown", (e) => {
		const upKey = 38;
		const downKey = 40;

		if (e.keyCode === upKey || e.keyCode === downKey) {
			tabs[tabFocus].setAttribute("tabindex", -1);
		}

		if (e.keyCode === downKey) {
			tabFocus++;
			if (tabFocus >= tabs.length) {
				tabFocus = 0;
			}
		}

		if (e.keyCode === upKey) {
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

			let tabContainer = targetTab.parentNode;

			tabContainer
				.querySelector('[aria-selected="true"]')
				.setAttribute("aria-selected", false);

			targetTab.setAttribute("aria-selected", true);

			const main = document.getElementById("main");
			const children = Array.from(main.children);

			const technology = children[3];
			const att = Array.from(technology.children);

			const head = att[0];
			const n = Array.from(head.children);

			let image = children[1];
			const i = Array.from(image.children);

			if (select === "1") {
				let curr = n[1];
				curr.innerText = techPages[0].name;

				att[1].innerText = techPages[0].description;

				i[0].src = techPages[0].images.portrait;
				// if (screen.width < 720) {
				// 	i[0].src = techPages[0].images.landscape;
				// }
			}

			if (select === "2") {
				let curr = n[1];
				curr.innerText = techPages[1].name;

				att[1].innerText = techPages[1].description;

				i[0].src = techPages[1].images.portrait;
				// if (screen.width < 720) {
				// 	i[0].src = techPages[1].images.landscape;
				// }
			}

			if (select === "3") {
				let curr = n[1];
				curr.innerText = techPages[2].name;

				att[1].innerText = techPages[2].description;

				i[0].src = techPages[2].images.portrait;
				// if (screen.width < 720) {
				// 	i[0].src = techPages[2].images.landscape;
				// }
			}
		});
	});
}
