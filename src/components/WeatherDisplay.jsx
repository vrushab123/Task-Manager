import React from 'react';

const WeatherDisplay = ({ weather, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="task-weather">
                <span className="loading-spinner"></span>
                <span>Loading weather forecast...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="task-weather weather-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <span>Weather error: {error}</span>
            </div>
        );
    }

    if (!weather) {
        return null;
    }

    // Create weather warnings
    let weatherWarning = null;
    if (weather.temp < 10) {
        weatherWarning = <span className="badge bg-warning text-dark ms-2">Too Cold!</span>;
    } else if (weather.description.includes('rain')) {
        weatherWarning = <span className="badge bg-info text-dark ms-2">Rainy!</span>;
    }

    // Format forecast time
    const forecastTime = new Date(weather.forecastTime);
    const forecastDate = forecastTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    const forecastTimeStr = forecastTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get weather icon class based on description
    const getWeatherThemeClass = () => {
        if (weather.description.includes('rain') || weather.description.includes('drizzle')) {
            return 'weather-rain';
        } else if (weather.description.includes('cloud')) {
            return 'weather-cloudy';
        } else if (weather.description.includes('clear')) {
            return 'weather-clear';
        } else if (weather.description.includes('snow')) {
            return 'weather-snow';
        } else if (weather.description.includes('thunder')) {
            return 'weather-storm';
        } else {
            return '';
        }
    };

    return (
        <div className={`task-weather ${getWeatherThemeClass()}`}>
            <img
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                alt="Weather icon"
            />
            <div>
                <div className="weather-temp">
                    {weather.temp.toFixed(1)}°C - {weather.description}
                    {weatherWarning}
                </div>
                <div className="text-muted small">
                    <i className="bi bi-clock me-1"></i>
                    Forecast for {forecastDate}, {forecastTimeStr}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;