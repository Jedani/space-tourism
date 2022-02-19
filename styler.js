const nav = document.querySelector(".primarynavigation");
let btn = document.querySelector(".mobile-toggler");
btn.addEventListener("click", () => {
	const vis = nav.getAttribute("data-visible");
	if (vis === "false") {
		nav.setAttribute("data-visible", true);
		btn.setAttribute("aria-expanded", true);
	} else {
		nav.setAttribute("data-visible", false);
		btn.setAttribute("aria-expanded", false);
	}
});
