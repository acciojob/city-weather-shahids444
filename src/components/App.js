<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>City Weather App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            min-width: 400px;
            max-width: 500px;
        }

        h1 {
            color: #2d3436;
            margin-bottom: 30px;
            font-size: 2.5rem;
            font-weight: 300;
        }

        .search-container {
            margin-bottom: 30px;
            position: relative;
        }

        .search {
            width: 100%;
            padding: 15px 20px;
            border: 2px solid #ddd;
            border-radius: 50px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
            background: white;
        }

        .search:focus {
            border-color: #74b9ff;
            box-shadow: 0 0 20px rgba(116, 185, 255, 0.3);
        }

        .search-btn {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            background: #74b9ff;
            border: none;
            color: white;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .search-btn:hover {
            background: #0984e3;
            transform: translateY(-50%) scale(1.05);
        }

        .weather {
            display: none;
            animation: fadeIn 0.6s ease-in;
        }

        .weather.show {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .city-name {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #2d3436;
            font-weight: 400;
        }

        .temperature {
            font-size: 4rem;
            font-weight: 300;
            color: #0984e3;
            margin: 20px 0;
        }

        .description {
            font-size: 1.3rem;
            color: #636e72;
            margin-bottom: 20px;
            text-transform: capitalize;
        }

        .weather-icon {
            width: 100px;
            height: 100px;
            margin: 20px auto;
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
        }

        .weather-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 30px;
        }

        .detail-item {
            background: rgba(116, 185, 255, 0.1);
            padding: 15px;
            border-radius: 15px;
            border: 1px solid rgba(116, 185, 255, 0.2);
        }

        .detail-label {
            font-size: 0.9rem;
            color: #636e72;
            margin-bottom: 5px;
        }

        .detail-value {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3436;
        }

        .error {
            color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            border: 1px solid rgba(231, 76, 60, 0.2);
            display: none;
        }

        .error.show {
            display: block;
            animation: fadeIn 0.3s ease-in;
        }

        .loading {
            display: none;
            margin-top: 20px;
        }

        .loading.show {
            display: block;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #ddd;
            border-top: 4px solid #74b9ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .api-info {
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid rgba(255, 193, 7, 0.3);
            border-radius: 10px;
            padding: 15px;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather App</h1>
        
        <div class="search-container">
            <input type="text" class="search" placeholder="Enter a city name..." />
            <button class="search-btn" onclick="getWeather()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </button>
        </div>

        <div class="loading">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>

        <div class="error">
            <p id="error-message">City not found. Please check the spelling and try again.</p>
        </div>

        <div class="weather">
            <div class="city-name" id="city-name"></div>
            <div class="temperature" id="temperature"></div>
            <div class="description" id="description"></div>
            <img class="weather-icon" id="weather-icon" src="" alt="Weather Icon" />
            
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Feels like</div>
                    <div class="detail-value" id="feels-like"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value" id="humidity"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value" id="wind-speed"></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value" id="pressure"></div>
                </div>
            </div>
        </div>

        <div class="api-info" style="display: none;">
            <strong>Note:</strong> You need to replace 'YOUR_API_KEY' in the code with your actual OpenWeatherMap API key. 
            <br>Get your free API key at <a href="https://openweathermap.org/api" target="_blank">openweathermap.org</a>
        </div>
    </div>

    <script>
        // Your OpenWeatherMap API key
        const API_KEY = 'b5b3971a3a7b63f94305678d83b0c3a9';
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

        const searchInput = document.querySelector('.search');
        const weatherDiv = document.querySelector('.weather');
        const errorDiv = document.querySelector('.error');
        const loadingDiv = document.querySelector('.loading');

        // Add event listener for Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });

        async function getWeather() {
            const query = searchInput.value.trim();
            
            if (!query) {
                showError('Please enter a city name');
                return;
            }

            if (API_KEY === 'db9f05a41e25820725e726cb6f4c66aa') {
                // API key is set, you can now search for weather data
            } else if (API_KEY === 'YOUR_API_KEY') {
                showError('Please add your OpenWeatherMap API key to use this app');
                return;
            }

            // Hide previous results and show loading
            hideElements();
            loadingDiv.classList.add('show');

            try {
                const response = await fetch(`${API_URL}?q=${query}&appid=${API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
                }

                const data = await response.json();
                displayWeather(data);
                
            } catch (error) {
                console.error('Error fetching weather:', error);
                showError(error.message || 'Failed to fetch weather data. Please try again.');
            } finally {
                loadingDiv.classList.remove('show');
            }
        }

        function displayWeather(data) {
            const {
                name,
                main: { temp, feels_like, humidity, pressure },
                weather,
                wind: { speed }
            } = data;

            // Update weather display
            document.getElementById('city-name').textContent = name;
            document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
            document.getElementById('description').textContent = weather[0].description;
            document.getElementById('feels-like').textContent = `${Math.round(feels_like)}°C`;
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('wind-speed').textContent = `${speed} m/s`;
            document.getElementById('pressure').textContent = `${pressure} hPa`;

            // Set weather icon
            const iconCode = weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').src = iconUrl;

            // Show weather display
            weatherDiv.classList.add('show');
        }

        function showError(message) {
            document.getElementById('error-message').textContent = message;
            errorDiv.classList.add('show');
        }

        function hideElements() {
            weatherDiv.classList.remove('show');
            errorDiv.classList.remove('show');
            loadingDiv.classList.remove('show');
        }

        // Demo with default city (Delhi)
        window.onload = function() {
            searchInput.value = 'Delhi';
            // Auto-load Delhi weather on page load
            getWeather();
        };
    </script>
</body>
</html>
