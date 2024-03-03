import React, { useState } from 'react';
import HumidityIcon from './images/humidity.jpg';
import SearchIcon from './images/search-icon.webp';
import WeatherIcon from './images/images.jpg';
import WindIcon from './images/wind.png';

import './style.css';

const apiKey = "1c4d46bf5bfb38c54d22ed487189b9ca";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');

  const handleSearch = async () => {
    try {
      const update = await fetch(`${apiURL}&q=${city}&appid=${apiKey}`);
      const data = await update.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input type="text" placeholder="Enter city name" spellCheck="false" 
          value={city} 
          onChange={(event) => setCity(event.target.value)} 
        />
        <button onClick={handleSearch}>
        <img src={SearchIcon} alt="Search Icon" />
        </button>
      </div>
      {weatherData &&(
        <div className="weather">
          <img src={WeatherIcon} alt="Weather Icon" />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>
          <div className="details">
            <div className="detail">
            <img src={HumidityIcon} alt="Humidity Icon" />
              <div>
                <h3 className="humidity">{weatherData.main.humidity}%</h3>
                <h4>Humidity</h4>
              </div>
            </div>
            <div className="detail">
            <img src={WindIcon} alt="Wind Icon" />
              <div>
                <h3 className="wind">{weatherData.wind.speed} km/hr</h3>
                <h4>Wind Speed</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
