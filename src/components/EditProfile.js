import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './EditProfile.css';

function EditProfile() {
  const [mentor, setMentor] = useState(null);
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

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentors/profile');
        if (response.ok) {
          const data = await response.json();
          setMentor(data);
          setFormData({
            name: data.name || '',
            qualification: data.qualification || '',
            years: data.years || '',
            company: data.company || '',
            domain: data.domain || '',
            email: data.email || '',
            experience: data.experience || '',
            education: data.education || '',
            skills: data.skills || '',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch mentor profile',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Failed to fetch mentor profile',
        });
      }
    };

    fetchMentor();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/mentors/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        });
        window.location.href = '/mentor-profile'; // Redirect to profile page
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update profile',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Failed to update profile',
      });
    }
  };

  if (!mentor) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2>Edit Profile</h2>

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

      {mentor.mentorType === 'industrial' && (
        <>
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

      {mentor.mentorType === 'institutional' && (
        <>
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

      <button type="submit">Update Profile</button>
    </form>
  );
}

export default EditProfile;
