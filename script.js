const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const result = document.getElementById('weather-result');

const API_KEY = '4bb2b6030d7f51fcbc04a9f99f73e933E'; // 🔑 Replace with your OpenWeather API key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city === '') return;

  try {
    result.innerHTML = 'Loading...';
    const weather = await fetchWeather(city);
    displayWeather(weather);
  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found or API error');
  }

  const data = await response.json();
  return {
    name: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  };
}

function displayWeather(weather) {
  result.innerHTML = `
    <h2>${weather.name}</h2>
    <img src="${weather.icon}" alt="${weather.description}" />
    <p><strong>${weather.temp}°C</strong></p>
    <p>${weather.description}</p>
  `;
}
