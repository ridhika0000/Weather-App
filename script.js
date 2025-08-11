
const apiKey = "7e23efa2013643ce12fd35275776424e"; // Replace with your real OpenWeather API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Please enter a city name.");

    // Current weather
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== 200) {
        alert("City not found.");
        return;
    }

    document.getElementById("current-weather").innerHTML = `
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].description}">
        <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
        <p>${weatherData.weather[0].description}</p>
    `;

    // 5-day forecast
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    let forecastHTML = "";
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const day = forecastData.list[i];
        forecastHTML += `
            <div class="forecast-day">
                <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                <p>${day.main.temp}°C</p>
            </div>
        `;
    }
    document.getElementById("forecast").innerHTML = forecastHTML;
}
