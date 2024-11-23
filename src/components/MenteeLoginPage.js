import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeLoginPage.css'
const MenteeLoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Make a POST request to the server to register the user
      const response = await fetch('/api/mentees/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          course,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Registration successful, navigate to the dashboard
        navigate('/mentee-dashboard');
      } else {
        // Display error message from the server
        alert(data.message || 'Registration failed, please try again!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred, please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Mentee Registration</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Qualification" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            required 
          />
        </div>
        <button className="buttonm" type="submit">Register</button>
      </form>
    </div>
  );
};

export default MenteeLoginPage;