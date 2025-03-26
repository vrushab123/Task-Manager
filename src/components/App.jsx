import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import UserProfile from './UserProfile';
import Login from './Login';
import TaskSummary from './TaskSummary';
import { selectIsAuthenticated } from '../store/authSlice';
import '../App.css';

function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <div className="app-wrapper">
            <Sidebar />
            <div className="main-content">
                <header className="main-header">
                    <div className="header-left">
                        <h1>Today's Tasks</h1>
                        <span className="date-subtitle">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <UserProfile />
                </header>

                <div className="content-area">
                    <TaskSummary />
                    <Routes>
                        <Route path="/" element={<TaskList />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
