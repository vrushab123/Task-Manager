import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../store/authSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="user-profile">
            <div className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-name">{user?.name}</div>
            <button
                className="btn btn-link"
                onClick={handleLogout}
            >
                <i className="bi bi-box-arrow-right"></i>
            </button>
        </div>
    );
};

export default UserProfile;
