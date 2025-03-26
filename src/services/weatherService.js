const API_KEY = '48aab4c9f248f880400e53fd3c5f1550'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (location) => {
    try {
        const response = await fetch(
            `${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

export async function fetchWeatherForTask(task) {
    if (task.type !== 'outdoor' || !task.location) {
        return null;
    }

    try {
        const taskDateTime = new Date(`${task.date}T${task.time}`);
        const now = new Date();

        // Skip geocoding and directly use the city name
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(task.location)}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Location not found: ${task.location}`);
            } else {
                throw new Error(`Weather API error (Status: ${response.status})`);
            }
        }

        const data = await response.json();
        const taskTime = taskDateTime.getTime();

        // Find closest time to task time
        let closestForecast = null;
        let minDifference = Infinity;

        for (const forecast of data.list) {
            const forecastTime = new Date(forecast.dt * 1000);
            const difference = Math.abs(forecastTime - taskTime);

            if (difference < minDifference) {
                minDifference = difference;
                closestForecast = forecast;
            }
        }

        if (closestForecast) {
            return {
                temp: closestForecast.main.temp,
                description: closestForecast.weather[0].description,
                icon: closestForecast.weather[0].icon,
                forecastTime: new Date(closestForecast.dt * 1000)
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return { error: error.message };
    }
}