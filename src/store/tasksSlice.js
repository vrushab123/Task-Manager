import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage - only if user is authenticated
const loadTasks = () => {
    try {
        // Check if user is authenticated
        const authState = localStorage.getItem('authState');
        if (!authState || !JSON.parse(authState).isAuthenticated) {
            return [];
        }

        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage', error);
        return [];
    }
};

const saveTasks = (tasks) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage', error);
    }
};

const initialState = {
    tasks: loadTasks(),
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            // Ensure new tasks have all the required properties
            const newTask = {
                id: action.payload.id || Date.now(),
                title: action.payload.title,
                type: action.payload.type || 'indoor',
                date: action.payload.date || new Date().toISOString().split('T')[0],
                time: action.payload.time || new Date().toTimeString().slice(0, 5),
                location: action.payload.location || '',
                priority: action.payload.priority || 'medium',
                completed: action.payload.completed || false,
                createdAt: action.payload.createdAt || new Date().toISOString(),
                weather: action.payload.weather || null
            };

            state.tasks.push(newTask);
            saveTasks(state.tasks);
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
            saveTasks(state.tasks);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasks(state.tasks);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload };
            }
            saveTasks(state.tasks);
        },
        updateTaskWeather: (state, action) => {
            const { taskId, weatherData } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                task.weatherData = weatherData;
            }
            saveTasks(state.tasks);
        },
        setWeatherLoading: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.weatherLoading = true;
                task.weatherError = null;
            }
        },
        setWeatherError: (state, action) => {
            const { taskId, error } = action.payload;
            const task = state.tasks.find(task => task.id === taskId);
            if (task) {
                task.weatherLoading = false;
                task.weatherError = error;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    updateTaskWeather,
    setWeatherLoading,
    setWeatherError,
    setLoading,
    setError,
} = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTaskById = (state, taskId) =>
    state.tasks.tasks.find(task => task.id === taskId);
export const selectTasksByType = (state, type) =>
    state.tasks.tasks.filter(task => task.type === type);
export const selectCompletedTasks = (state) =>
    state.tasks.tasks.filter(task => task.completed);
export const selectPendingTasks = (state) =>
    state.tasks.tasks.filter(task => !task.completed);
export const selectTasksByPriority = (state, priority) =>
    state.tasks.tasks.filter(task => task.priority === priority);
export const selectLoading = (state) => state.tasks.loading;
export const selectError = (state) => state.tasks.error;

export default tasksSlice.reducer;