import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, updateTaskWeather } from '../store/tasksSlice';
import { fetchWeatherData } from '../services/weatherService';

const TaskItem = ({ task, onComplete }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getWeatherForTask = async () => {
            if (task.type === 'outdoor' && task.location && !task.weatherData) {
                try {
                    const weatherData = await fetchWeatherData(task.location);
                    dispatch(updateTaskWeather({ taskId: task.id, weatherData }));
                } catch (error) {
                    console.error('Error fetching weather:', error);
                }
            }
        };

        getWeatherForTask();
    }, [task.id, task.type, task.location, dispatch]);

    const handleToggle = () => {
        dispatch(toggleTask(task.id));
        if (!task.completed) {
            onComplete?.(task.id);
        }
    };

    const getPriorityClass = (priority) => {
        const classes = {
            low: 'priority-low',
            medium: 'priority-medium',
            high: 'priority-high'
        };
        return classes[priority] || '';
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-main">
                <div className="task-checkbox">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggle}
                    />
                </div>

                <div className="task-content">
                    <div className="task-title-row">
                        <span className={`priority-indicator ${getPriorityClass(task.priority)}`}></span>
                        <h3 className="task-title">{task.title}</h3>
                    </div>

                    <div className="task-details">
                        <span className="task-date">
                            <i className="bi bi-calendar3"></i>
                            {new Date(task.date).toLocaleDateString()}
                        </span>
                        <span className="task-time">
                            <i className="bi bi-clock"></i>
                            {task.time}
                        </span>
                        {task.location && (
                            <span className="task-location">
                                <i className="bi bi-geo-alt"></i>
                                {task.location}
                            </span>
                        )}
                        <span className={`task-type ${task.type}`}>
                            <i className={`bi bi-${task.type === 'indoor' ? 'house' : 'tree'}`}></i>
                            {task.type}
                        </span>
                    </div>

                    {task.type === 'outdoor' && (
                        <div className="weather-info">
                            {task.weatherLoading && <span>Loading weather...</span>}
                            {task.weatherError && <span className="error">{task.weatherError}</span>}
                            {task.weatherData && (
                                <>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${task.weatherData.weather[0].icon}@2x.png`}
                                        alt="Weather icon"
                                        className="weather-icon"
                                    />
                                    <span className="weather-temp">
                                        {Math.round(task.weatherData.main.temp)}°C
                                    </span>
                                    <span className="weather-desc">
                                        {task.weatherData.weather[0].description}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button
                    className="delete-btn"
                    onClick={() => dispatch(deleteTask(task.id))}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;