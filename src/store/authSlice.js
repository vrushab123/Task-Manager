import { createSlice } from '@reduxjs/toolkit';

// Get the initial auth state from localStorage if available
const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return {
                isAuthenticated: false,
                user: null,
                error: null
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            isAuthenticated: false,
            user: null,
            error: null
        };
    }
};

const saveAuthState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authState', serializedState);
    } catch (err) {
        // Handle write errors
        console.error('Could not save auth state', err);
    }
};

// Mock user database
const users = [
    { username: 'user1', password: 'password1', name: 'Demo User' },
    { username: 'admin', password: 'admin123', name: 'Administrator' }
];

const initialState = loadAuthState();

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
            // Save to localStorage
            saveAuthState({
                isAuthenticated: true,
                user: action.payload,
                error: null
            });
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            // Clear from localStorage
            saveAuthState({
                isAuthenticated: false,
                user: null,
                error: null
            });
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

// Action creators
export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    clearError
} = authSlice.actions;

// Thunk for handling login
export const login = (credentials) => (dispatch) => {
    dispatch(loginRequest());

    // Simulate API call delay
    setTimeout(() => {
        const user = users.find(
            user => user.username === credentials.username &&
                user.password === credentials.password
        );

        if (user) {
            // Send user data without the password
            const { password, ...userWithoutPassword } = user;
            dispatch(loginSuccess(userWithoutPassword));
        } else {
            dispatch(loginFailure('Invalid username or password'));
        }
    }, 1000);
};

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
