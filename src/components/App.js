// src/components/App.js
import React, { useState, useEffect } from "react";
import './App.css'; // Move your CSS into this file or use styled-components

const API_KEY = 'db9f05a41e25820725e726cb6f4c66aa';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function App() {
    const [query, setQuery] = useState('Delhi');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        if (!query) {
            setError("Please enter a city name");
            return;
        }

        setLoading(true);
        setError("");
        setWeatherData(null);

        try {
            const response = await fetch(`${API_URL}?q=${query}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error("City not found");

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="search-container">
                <input
                    className="search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a city name..."
                    onKeyPress={(e) => { if (e.key === "Enter") fetchWeather(); }}
                />
                <button className="search-btn" onClick={fetchWeather}>
                    🔍
                </button>
            </div>

            {loading && <div className="loading">Loading...</div>}

            {error && <div className="error">{error}</div>}

            {weatherData && (
                <div className="weather show">
                    <div className="city-name">{weatherData.name}</div>
                    <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
                    <div className="description">{weatherData.weather[0].description}</div>
                    <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="icon"
                    />
                    <div className="weather-details">
                        <div className="detail-item">
                            <div className="detail-label">Feels like</div>
                            <div className="detail-value">{Math.round(weatherData.main.feels_like)}°C</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Humidity</div>
                            <div className="detail-value">{weatherData.main.humidity}%</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Wind Speed</div>
                            <div className="detail-value">{weatherData.wind.speed} m/s</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Pressure</div>
                            <div className="detail-value">{weatherData.main.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
