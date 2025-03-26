import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectTasks } from '../store/tasksSlice';

const TaskForm = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);

    const [formData, setFormData] = useState({
        title: '',
        type: 'indoor',
        date: new Date().toISOString().split('T')[0], // Today's date
        time: new Date().toTimeString().slice(0, 5), // Current time
        location: '',
        priority: 'medium' // Default priority
    });

    // Load the last used location from tasks if available
    useEffect(() => {
        if (tasks.length > 0) {
            // Find the most recent task with a location
            const recentTaskWithLocation = [...tasks]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .find(task => task.location);

            if (recentTaskWithLocation?.location) {
                setFormData(prev => ({
                    ...prev,
                    location: recentTaskWithLocation.location
                }));
            }
        }
    }, [tasks]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            ...formData,
            weather: null,
            completed: false,
            createdAt: new Date().toISOString()
        };

        dispatch(addTask(newTask));

        // Reset form but preserve location
        const savedLocation = formData.location;

        setFormData(prev => ({
            ...prev,
            title: '',
            type: 'indoor',
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().slice(0, 5),
            priority: 'medium',
            location: savedLocation // Preserve the location
        }));
    };

    const handleKeyPress = (e) => {
        // Submit form on Enter key press in the title field
        if (e.key === 'Enter' && e.target.id === 'title' && formData.title.trim()) {
            handleSubmit(e);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title">
                            <i className="bi bi-pencil-square me-2"></i>Task Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="What needs to be done?"
                            value={formData.title}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            required
                        />
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="type">
                                <i className="bi bi-tag me-2"></i>Task Type
                            </label>
                            <select
                                className="form-select"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="indoor">Indoor Activity</option>
                                <option value="outdoor">Outdoor Activity</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="priority">
                                <i className="bi bi-flag me-2"></i>Priority
                            </label>
                            <select
                                className="form-select"
                                id="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="date">
                                <i className="bi bi-calendar me-2"></i>Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="time">
                                <i className="bi bi-clock me-2"></i>Time
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">
                            <i className="bi bi-geo-alt me-2"></i>Location
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                placeholder="City name"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                            {formData.location && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setFormData(prev => ({ ...prev, location: '' }))}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-3d w-100">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm; 