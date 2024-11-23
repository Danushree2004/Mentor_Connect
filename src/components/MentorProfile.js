import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './MentorProfile.css';
import { useNavigate } from 'react-router-dom';

function MentorProfile() {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentors/profile');
        if (response.ok) {
          const data = await response.json();
          setMentor(data[0]); // Assuming you want the first mentor from the list
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
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, []);


const handleEdit = () => {
  navigate('/edit-profile');
};


  if (loading) return <p>Loading...</p>;
  if (!mentor) return <p>No mentor profile found</p>;

  return (
    <div className="mentor-profile">
      <h1>Mentor Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {mentor.name}</p>
        {mentor.mentorType === 'industrial' && (
          <>
            <p><strong>Qualification:</strong> {mentor.qualification}</p>
            <p><strong>Years of Experience:</strong> {mentor.years}</p>
            <p><strong>Company:</strong> {mentor.company}</p>
            <p><strong>Domain:</strong> {mentor.domain}</p>
          </>
        )}
        {mentor.mentorType === 'institutional' && (
          <>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Experience:</strong> {mentor.experience}</p>
            <p><strong>Education:</strong> {mentor.education}</p>
            <p><strong>Skills:</strong> {mentor.skills}</p>
          </>
        )}
        <button onClick={handleEdit} className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
}

export default MentorProfile;
