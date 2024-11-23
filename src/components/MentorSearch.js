import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MentorSearch.css'; 

const mentorsData = [
  {
    name: 'Dr. Vanitha',
    subject: 'Machine Learning',
    email: 'vanitha@institution.com',
    rating: 5,
    bio: 'Experienced Machine Learning researcher with a strong focus on advanced algorithms and applications.',
    expertise: ['Deep Learning', 'Natural Language Processing'],
    comments: 'Highly recommended for research projects and complex ML problems.',
    image: 'mam.jpg'
  },
  { 
    name: 'Kavitha', 
    subject: 'Deep Learning', 
    email: 'kavitha@institution.com', 
    rating: 4,
    bio: 'Specialist in Deep Learning with a solid background in neural networks and computer vision.',
    expertise: ['Computer Vision', 'Neural Networks'],
    comments: 'Excellent for vision-based tasks and neural network design.',
    image: 'mam.jpg'
  },
  { 
    name: 'Saranya', 
    subject: 'Java', 
    email: 'saranya@institution.com', 
    rating: 3,
    bio: 'Java developer with experience in building enterprise-level applications and systems.',
    expertise: ['Spring Framework', 'Hibernate'],
    comments: 'Good for enterprise application development and backend solutions.',
    image: 'mam.jpg'
  },
  { 
    name: 'Harini', 
    subject: 'React', 
    email: 'harini@institution.com', 
    rating: 2,
    bio: 'Front-end developer with expertise in React and modern JavaScript frameworks.',
    expertise: ['Redux', 'Hooks'],
    comments: 'Best for UI/UX development and modern frontend applications.',
    image: 'mam.jpg'
  },
  { 
    name: 'John', 
    subject: 'Machine Learning', 
    email: 'john@institution.com', 
    rating: 1,
    bio: 'Machine Learning enthusiast with a focus on basic ML techniques and applications.',
    expertise: ['Data Analysis', 'Basic ML Algorithms'],
    comments: 'Suitable for introductory ML projects and basic model building.',
    image: 'mam.jpg'
  },
  { 
    name: 'DanuShree', 
    subject: 'Deep Learning', 
    email: 'danushree@institution.com', 
    rating: 5,
    bio: 'Expert in Deep Learning with extensive experience in developing and deploying complex models.',
    expertise: ['Natural Language Processing', 'Generative Models'],
    comments: 'Highly skilled in cutting-edge deep learning technologies and research.',
    image: 'mam.jpg'
  },
  { 
    name: 'Krupa', 
    subject: 'Java', 
    email: 'krupa@institution.com', 
    rating: 4,
    bio: 'Java developer with a focus on microservices architecture and scalable solutions.',
    expertise: ['Microservices', 'Spring Boot'],
    comments: 'Excellent for developing scalable and robust backend systems.',
    image: 'mam.jpg'
  },
  { 
    name: 'Sowndharya', 
    subject: 'React', 
    email: 'sowndharya@institution.com', 
    rating: 3,
    bio: 'Front-end developer with experience in React and user interface design.',
    expertise: ['GraphQL', 'Styled Components'],
    comments: 'Good for modern web development and creating interactive UIs.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Sudha', 
    subject: 'Machine Learning', 
    email: 'sudha@institution.com', 
    rating: 1,
    bio: 'New to Machine Learning with a focus on basic concepts and introductory techniques.',
    expertise: ['Basic ML Techniques'],
    comments: 'Suitable for beginners and those new to machine learning.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Saravanan', 
    subject: 'Machine Learning', 
    email: 'saravanan@institution.com', 
    rating: 2,
    bio: 'Machine Learning practitioner with a focus on practical implementations and data-driven projects.',
    expertise: ['Data Cleaning', 'Feature Engineering'],
    comments: 'Good for practical projects and data preparation tasks.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Suji', 
    subject: 'Machine Learning', 
    email: 'suji@institution.com', 
    rating: 3,
    bio: 'Experienced in Machine Learning with a background in both theoretical and applied ML.',
    expertise: ['Algorithm Design', 'Model Evaluation'],
    comments: 'Suitable for comprehensive ML projects and model evaluation.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Viji', 
    subject: 'Machine Learning', 
    email: 'viji@institution.com', 
    rating: 4,
    bio: 'Expert in Machine Learning with a focus on advanced algorithms and practical applications.',
    expertise: ['Algorithm Optimization', 'Big Data Analytics'],
    comments: 'Great for advanced ML tasks and data analysis.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Namitha', 
    subject: 'Machine Learning', 
    email: 'namitha@institution.com', 
    rating: 5,
    bio: 'Leading researcher in Machine Learning with extensive experience in various ML fields.',
    expertise: ['Research and Development', 'Advanced ML Techniques'],
    comments: 'Highly recommended for advanced research and complex problem-solving.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Sunitha', 
    subject: 'Machine Learning', 
    email: 'sunitha@institution.com', 
    rating: 4,
    bio: 'Machine Learning expert with a strong background in implementing ML solutions in real-world scenarios.',
    expertise: ['Deployment', 'Real-world Applications'],
    comments: 'Great for practical implementations and industry applications.',
    image: 'mam.jpg'
  },
  { 
    name: 'Dr. Kamal', 
    subject: 'Machine Learning', 
    email: 'kamal@institution.com', 
    rating: 3,
    bio: 'Experienced in various Machine Learning techniques with a focus on practical use cases.',
    expertise: ['Model Tuning', 'Predictive Modeling'],
    comments: 'Good for practical advice and model optimization.',
    image: 'mam.jpg'
  },
  
];

const subjects = ['Machine Learning', 'Deep Learning', 'Java', 'React'];

const MentorSearch = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const navigate = useNavigate();

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);

    if (subject === '') {
      setFilteredMentors([]);
    } else {
      const filtered = mentorsData
        .filter(mentor => mentor.subject === subject)
        .sort((a, b) => b.rating - a.rating); // Sort mentors by rating in descending order

      setFilteredMentors(filtered);
    }
  };

  const handleMentorClick = (mentor) => {
    navigate(`/mentor/${mentor.name}`, { state: { mentor } });
  };

  return (
    <div className="mentor-search-container">
      <h2>Select a Subject to Find Mentors</h2>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">-- Select Subject --</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {selectedSubject && filteredMentors.length > 0 ? (
        <ul className="mentor-list">
          {filteredMentors.map((mentor, index) => (
            <li
              key={index}
              className="mentor-item"
              onClick={() => handleMentorClick(mentor)}
              style={{ cursor: 'pointer' }}
            >
              <div className="mentor-info">
                <div className="mentor-text">
                  <h3>{mentor.name}</h3>
                  <p>Rating: <span className="rating-stars">{renderStars(mentor.rating)}</span></p>
                </div>
                <img src={mentor.image || 'default-image.jpg'} alt={mentor.name} className="mentor-image" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        selectedSubject && <p>No mentors available for "{selectedSubject}".</p>
      )}
    </div>
  );
};

// Render star ratings
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

export default MentorSearch;