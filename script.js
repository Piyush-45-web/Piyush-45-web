async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '291f507d5c9460e28632d562c2ba79af'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        document.getElementById('weatherInfo').innerHTML = `❌ City not found`;
        return;
      }

      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      document.getElementById('weatherInfo').innerHTML = `
        <h2>${city}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        <p>🌡️ ${temp} °C</p>
        <p>🌤️ ${description}</p>
      `;
    } catch (error) {
      console.error('Error fetching weather:', error);
      document.getElementById('weatherInfo').innerHTML = `⚠️ Error retrieving weather`;
    }
  }