import React from 'react';
import { useLocation } from 'react-router-dom';
import './MentorDetails.css';

const MentorDetails = () => {
  const location = useLocation();
  const { mentor } = location.state; // Extract the mentor data passed via state

  // Fallback values in case expertise or comments are not defined
  const expertiseList = mentor.expertise ? mentor.expertise.join(', ') : 'N/A';
  const comments = mentor.comments || 'No additional comments available.';

  return (
    <div className="mentor-details-container">
      <div className="mentor-details-content">
        <h2>{mentor.name}'s Details</h2>
        <p><strong>Subject:</strong> {mentor.subject}</p>
        <p><strong>Email:</strong> {mentor.email}</p>
        <p><strong>Rating:</strong> {renderStars(mentor.rating)}</p>
        <p><strong>Bio:</strong> {mentor.bio || 'No bio available.'}</p> {/* Fallback for bio */}
        <p><strong>Areas of Expertise:</strong> {expertiseList}</p>
        <p><strong>Additional Comments:</strong> {comments}</p>
      </div>
      <img src={mentor.image} alt={mentor.name} className="mentor-image" />
    </div>
  );
};

// Reuse renderStars function to display star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i === fullStars && halfStar) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else {
      stars.push(<span key={i} className="star">☆</span>);
    }
  }
  return stars;
};

export default MentorDetails;