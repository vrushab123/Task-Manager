import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import TaskItem from './TaskItem';
import QuoteDisplay from './QuoteDisplay';
import { fetchQuote, getRandomMessage } from '../services/quoteService';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        type: 'indoor',
        priority: 'medium',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        location: ''
    });
    const [quote, setQuote] = useState('');
    const [showQuote, setShowQuote] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.title.trim()) {
            dispatch(addTask({
                ...newTask,
                id: Date.now(),
                completed: false,
                createdAt: new Date().toISOString()
            }));
            const message = getRandomMessage();
            setQuote(message);
            setShowQuote(true);
            setTimeout(() => setShowQuote(false), 5000);
            setNewTask({
                title: '',
                type: 'indoor',
                priority: 'medium',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toTimeString().slice(0, 5),
                location: ''
            });
            setShowAddForm(false);
        }
    };

    const handleTaskComplete = async (taskId) => {
        // Your existing task completion logic
        const newQuote = await fetchQuote();
        if (newQuote) {
            setQuote(newQuote.q);
            setShowQuote(true);
            setTimeout(() => setShowQuote(false), 5000);
        }
    };

    return (
        <div className="task-list">
            {showAddForm ? (
                <div className="quick-add-form">
                    <form onSubmit={handleAddTask}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Task name"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                autoFocus
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group date-time-group">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newTask.date}
                                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group date-time-group">
                                <input
                                    type="time"
                                    className="form-control"
                                    value={newTask.time}
                                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <select
                                className="form-control"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                            <select
                                className="form-control"
                                value={newTask.type}
                                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                            >
                                <option value="indoor">Indoor</option>
                                <option value="outdoor">Outdoor</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Location (optional)"
                                value={newTask.location}
                                onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Task</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div
                    className="add-task-button"
                    onClick={() => setShowAddForm(true)}
                >
                    <i className="bi bi-plus"></i>
                    <span>Add task</span>
                </div>
            )}

            <QuoteDisplay quote={quote} show={showQuote} />

            <div className="tasks-container">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={handleTaskComplete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList; 