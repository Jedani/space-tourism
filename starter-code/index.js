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
	const pages = data.destinations;
	console.log(pages);
}
