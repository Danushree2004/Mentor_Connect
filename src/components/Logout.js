// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('authToken'); // Clear the token
        navigate('/login'); // Redirect to login page
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}

export default Logout;
