import React from 'react';
import { useSelector } from 'react-redux';

const TaskSummary = () => {
    const tasks = useSelector(state => state.tasks.tasks);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        pending: tasks.filter(task => !task.completed).length,
        high: tasks.filter(task => task.priority === 'high' && !task.completed).length,
        medium: tasks.filter(task => task.priority === 'medium' && !task.completed).length,
        low: tasks.filter(task => task.priority === 'low' && !task.completed).length
    };

    return (
        <div className="task-summary">
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="card-value">{stats.pending}</div>
                    <div className="card-label">Pending</div>
                </div>
                <div className="summary-card">
                    <div className="card-value">{stats.completed}</div>
                    <div className="card-label">Completed</div>
                </div>
                <div className="summary-card">
                    <div className="card-value">{stats.high}</div>
                    <div className="card-label">High Priority</div>
                </div>
                <div className="summary-card">
                    <div className="card-value">{stats.medium}</div>
                    <div className="card-label">Medium Priority</div>
                </div>
                <div className="summary-card">
                    <div className="card-value">{stats.low}</div>
                    <div className="card-label">Low Priority</div>
                </div>
            </div>
        </div>
    );
};

export default TaskSummary;