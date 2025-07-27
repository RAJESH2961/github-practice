const API_KEY = '6973ebbfaff56f2c88b5ba89fbdd6a93';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const info = document.getElementById('weatherInfo');

  errorMsg.textContent = '';
  info.style.display = 'none';

  if (!city) {
    errorMsg.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('tempMin').textContent = `${Math.round(data.main.temp_min)}°C`;
    document.getElementById('tempMax').textContent = `${Math.round(data.main.temp_max)}°C`;
    document.getElementById('country').textContent = data.sys.country;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    info.style.display = 'block';
  } catch (err) {
    errorMsg.textContent = '❌ Could not fetch weather. Try another city.';
  }
}
