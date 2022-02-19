const data = async function () {
	const response = await fetch("data.json");

	if (response.status !== 200) {
		throw new Error("can't fetch data from resource");
	}

	const data = await response.json();

	return data.crew;
};

data()
	.then((data) => strip(data))
	.catch((err) => err.message);

function strip(data) {
	let crewPages = data;

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

			let tabContainer = targetTab.parentNode;

			tabContainer
				.querySelector('[aria-selected="true"]')
				.setAttribute("aria-selected", false);

			targetTab.setAttribute("aria-selected", true);

			const main = document.getElementById("main");
			const children = Array.from(main.children);

			const crew = children[2];
			const att = Array.from(crew.children);

			const head = att[0];
			const n = Array.from(head.children);

			let image = children[3];
			const i = Array.from(image.children);

			if (select === "commander-tab") {
				let curr = att[1];
				curr.innerText = crewPages[0].bio;

				n[1].innerText = crewPages[0].name;
				n[0].innerText = crewPages[0].role;

				i[0].srcset = crewPages[0].images.webp;
				i[1].src = crewPages[0].images.png;
			}
			if (select === "mission-tab") {
				let curr = att[1];
				curr.innerText = crewPages[1].bio;

				n[1].innerText = crewPages[1].name;
				n[0].innerText = crewPages[1].role;

				i[0].srcset = crewPages[1].images.webp;
				i[1].src = crewPages[1].images.png;
			}
			if (select === "pilot-tab") {
				let curr = att[1];
				curr.innerText = crewPages[2].bio;

				n[1].innerText = crewPages[2].name;
				n[0].innerText = crewPages[2].role;

				i[0].srcset = crewPages[2].images.webp;
				i[1].src = crewPages[2].images.png;
			}
			if (select === "engineer-tab") {
				let curr = att[1];
				curr.innerText = crewPages[3].bio;

				n[1].innerText = crewPages[3].name;
				n[0].innerText = crewPages[3].role;

				i[0].srcset = crewPages[3].images.webp;
				i[1].src = crewPages[3].images.png;
			}
		});
	});
}
