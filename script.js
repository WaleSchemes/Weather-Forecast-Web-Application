async function getWeather() {
    const apiKey = '94809c5014e541c882f01517240407';
    const city = 'Lagos';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        const forecast = data.forecast.forecastday;
        const weatherContainer = document.getElementById('weather');

        // Clear previous weather cards
        weatherContainer.innerHTML = '';

        forecast.forEach(day => {
            const date = new Date(day.date);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            const temperature = Math.round(day.day.avgtemp_c);
            const description = day.day.condition.text;

            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');
            weatherCard.innerHTML = `
                <p><strong>${dayOfWeek}</strong></p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;

            weatherContainer.appendChild(weatherCard);
        });
    } catch (error) {
        console.error(error);
    }
}

// Call the getWeather function after the DOM content is loaded
document.addEventListener('DOMContentLoaded', getWeather);
