import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '48aab4c9f248f880400e53fd3c5f1550'; // Replace with your API key

// Async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (task, { rejectWithValue }) => {
        if (task.type !== 'outdoor' || !task.location) {
            return null;
        }

        try {
            const taskDateTime = new Date(`${task.date}T${task.time}`);

            // Get coordinates from city name
            const geoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(task.location)}&limit=1&appid=${API_KEY}`
            );

            if (!geoResponse.ok) {
                return rejectWithValue(`Unable to find location: ${task.location} (Status: ${geoResponse.status})`);
            }

            const geoData = await geoResponse.json();
            if (!geoData || !geoData.length) {
                return rejectWithValue(`Location not found: ${task.location}`);
            }

            const { lat, lon } = geoData[0];

            // Get forecast data
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) {
                return rejectWithValue(`Weather forecast not available (Status: ${response.status})`);
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
                    taskId: task.id,
                    weatherData: {
                        temp: closestForecast.main.temp,
                        description: closestForecast.weather[0].description,
                        icon: closestForecast.weather[0].icon,
                        forecastTime: closestForecast.dt * 1000 // Convert to milliseconds
                    }
                };
            }

            return rejectWithValue('No forecast available for this time');
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    weatherRequests: {}, // Will track loading states by task ID
    errors: {} // Will track errors by task ID
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearWeatherError: (state, action) => {
            const taskId = action.payload;
            delete state.errors[taskId];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state, action) => {
                // Use the task ID from the meta to identify which task is loading
                const taskId = action.meta.arg.id;
                state.weatherRequests[taskId] = 'loading';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                const taskId = action.meta.arg.id;
                state.weatherRequests[taskId] = 'succeeded';
                delete state.errors[taskId];
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                const taskId = action.meta.arg.id;
                state.weatherRequests[taskId] = 'failed';
                state.errors[taskId] = action.payload || 'Unknown error occurred';
            });
    },
});

export const { clearWeatherError } = weatherSlice.actions;

export const selectWeatherStatus = (state, taskId) => state.weather.weatherRequests[taskId] || 'idle';
export const selectWeatherError = (state, taskId) => state.weather.errors[taskId];

export default weatherSlice.reducer;