import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "ba6df9d78f99fd42482d86d1cff87a33";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch data");
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <h1>City Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;
