import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth, clearError } from '../store/authSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(selectAuth);

    // Clear any errors when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            <i className="bi bi-person me-2"></i>Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                            <i className="bi bi-lock me-2"></i>Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-3d w-100" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Login
                            </>
                        )}
                    </button>
                    <div className="mt-4 text-center demo-credentials">
                        <div className="card demo-card">
                            <div className="card-body py-2">
                                <h6 className="mb-2">Demo Credentials</h6>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <div className="demo-user">
                                            <span className="fw-bold">Username:</span> user1<br />
                                            <span className="fw-bold">Password:</span> password1
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="demo-user">
                                            <span className="fw-bold">Username:</span> admin<br />
                                            <span className="fw-bold">Password:</span> admin123
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
