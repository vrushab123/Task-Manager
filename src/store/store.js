import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import weatherReducer from './weatherSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        weather: weatherReducer,
        auth: authReducer
    },
    // Redux Thunk is included by default with configureStore
});

export default store;