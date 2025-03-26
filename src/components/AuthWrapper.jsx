import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';
import Login from './Login';

const AuthWrapper = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return (
            <div className="container mt-5 mb-5">
                <header className="app-header">
                    <h1 className="app-title">Weather-Aware Task Manager</h1>
                    <p className="app-subtitle">
                        Sign in to manage your tasks with weather insights
                    </p>
                </header>

                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="login-container">
                            <Login />
                        </div>
                    </div>
                </div>

                <footer className="app-footer mt-5">
                    <p className="small text-muted">
                        <i className="bi bi-shield-lock me-2"></i>
                        Authentication is simulated locally - no data is sent to any server
                    </p>
                </footer>
            </div>
        );
    }

    return children;
};

export default AuthWrapper;
