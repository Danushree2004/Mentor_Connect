// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Check for token

    return (
        <Route
            {...rest}
            element={isAuthenticated ? Component : <Navigate to="/login" />}
        />
    );
}

export default ProtectedRoute;
