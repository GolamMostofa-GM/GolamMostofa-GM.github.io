async function getWeatherForecast() {
    const apiKey = 'ef400ad932edcf126e17b83e010d253b'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-data');
    weatherDiv.innerHTML = ''; // Clear previous data
    
    const city = data.city.name;
    const forecasts = data.list.slice(0, 5); // Get the first 5 forecast entries (15 hours)

    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleString();
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;

        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
            <strong>${date}</strong><br>
            Temperature: ${temp}°C<br>
            Weather: ${description}<br>
            Wind Speed: ${windSpeed} m/s<br>
            Humidity: ${humidity}%
        `;
        weatherDiv.appendChild(forecastElement);
    });
}
