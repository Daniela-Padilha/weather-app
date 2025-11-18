function fetchWeather() {
	let searchInput = document.getElementById("search-bar").value;
	const weatherData = document.getElementById("data");
	weatherData.style.display = "block";
	const apiKey = "API KEY";

	if (searchInput == "") {
		weatherData.innerHTML = `
		<div>
			<h2>Empty Input!</h2>
			<p>Please try again with a valid <b><u>city name</u></b>.</p>
		</div>
		`;
		return ;
	}

	async function getLonAndLat() {
		const countryCode = 1;
		const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
	}

	async function getWeatherData(lon, lat) {

	}
}