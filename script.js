async function fetchWeather() {
	let searchInput = document.getElementById("search-bar").value;
	const weatherData = document.getElementById("data");
	weatherData.style.display = "block";
	const apiKey = "d4a10ad48bdc6a75ea8bc97282e6215f";

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
		const countryCode = 351;
		const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)},${countryCode}&limit=1&appid=${apiKey}`;
		const response = await fetch(geocodeURL);
		if (!response.ok)
		{
			console.log("Bad response: ", response.status);
			return ;
		}
		const data = await response.json();
		if (data.length == 0)
		{
			console.log("Something went wrong!");
			weatherData.innerHTML = `
			<div>
				<h2>Invalid Input: "${searchInput}"</h2>
				<p>Please try again with a valid <b><u>city name</u></b>.</p>
			</div>
			`;
			return ;
		}
		else
			return data[0];
	}

	async function getWeatherData(lon, lat) {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
		if (!response.ok)
		{
			console.log("Bad response: ", response.status);
			return ;
		}
		const data = await response.json();
		weatherData.style.display = "flex";
		weatherData.innerHTML = `
		<img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].icon}" width="100" />
		<div>
			<h2>${data.name}</h2>
			<p><b>Temperature:</b> ${Math.round(data.main.temp - 273.15)}°C</p>
			<p><b>Description:</b> ${data.weather[0].description}</p>
		</div>
		`;
	}
	document.getElementById("search-bar").value = "";
	const geocodeData = await getLonAndLat();
	getWeatherData(geocodeData.lon, geocodeData.lat);
}