import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './MentorReg.css';
import { useNavigate } from 'react-router-dom';

function MentorRegistration() {
  const [mentorType, setMentorType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    years: '',
    company: '',
    domain: '',
    email: '',
    experience: '',
    education: '',
    skills: '',
  });

  const navigate = useNavigate(); // For navigation

  const handleTypeChange = (e) => {
    setMentorType(e.target.value);
    setFormData({
      name: '',
      qualification: '',
      years: '',
      company: '',
      domain: '',
      email: '',
      experience: '',
      education: '',
      skills: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Name is required',
      });
      return;
    }

    if (mentorType === 'industrial') {
      if (!formData.qualification || !formData.years || !formData.company || !formData.domain) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'All fields are required for Industrial Mentor',
        });
        return;
      }
    } else if (mentorType === 'institutional') {
      if (!formData.email || !formData.experience || !formData.education || !formData.skills) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'All fields are required for Institutional Mentor',
        });
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/mentors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, mentorType }),
      });

      if (response.ok) {
        const { mentorId } = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Mentor registered successfully',
        });
        navigate(`/mentor-profile/${mentorId}`);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorData.error || 'Failed to register mentor',
        });
      }
    } catch (error) {
      console.error('Error registering mentor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Failed to register mentor',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mentor-form">
      <h2>Mentor Registration</h2>

      <div>
        <label>Mentor Type:</label>
        <select value={mentorType} onChange={handleTypeChange} required>
          <option value="">Select Type...</option>
          <option value="industrial">Industrial Mentor</option>
          <option value="institutional">Institutional Mentor</option>
        </select>
      </div>

      {mentorType === 'industrial' && (
        <>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Qualification:</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Years of Experience:</label>
            <input
              type="number"
              name="years"
              placeholder="Enter years of experience"
              value={formData.years}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Domain:</label>
            <input
              type="text"
              name="domain"
              placeholder="Enter your domain"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {mentorType === 'institutional' && (
        <>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              placeholder="Enter your experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Education:</label>
            <input
              type="text"
              name="education"
              placeholder="Enter your education"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Skills:</label>
            <input
              type="text"
              name="skills"
              placeholder="Enter your skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      <button type="submit">Register</button>
    </form>
  );
}

export default MentorRegistration;


