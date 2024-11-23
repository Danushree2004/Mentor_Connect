import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import RoomPage from './components/room/';
import Room from './components/Room';
import CalendarPage from './components/CalendarPage';
import Dashboard from './components/Dashboard'; 
import Calendar from './components/Calendar'; 
import CalendarDayView from './components/DayView'; 
import MentorSearch from './components/MentorSearch'; // Import the MentorSearch component
import MentorDetail from './components/MentorDetail';
import Mentor from './components/Mentor';
import MentorRegistration from './components/MentorRegistration';
import MentorProfile from './components/MentorProfile';
import EditMentorProfile from './components/EditProfile';
import './App.css';
import Scheduler from './components/Scheduler';
import MenteeLoginPage from './components/MenteeLoginPage';
import MoProfile from './components/MoProfile';

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
       
          <header className="headera">
            <h1>Mentoring at Your Desk</h1>
            <br/>
            <nav>
              <Link to="/">Home</Link>
              {/* <Link to="/about">About Us</Link> */}
              <Link to="/scheduler">Scheduler</Link>
              <Link to="/room">Room</Link>
              { <Link to="/register">Register</Link> }
              
              <Link to="/dashboard">Dashboard</Link>

              <Link to="/MentorSearch">MentorDetails</Link>
              <Link to="/menteeLoginPage">Student</Link>

              <Link to="/MentorRegistration">Mentor</Link>
              <Link to="/login">Login</Link>
              <Link to="/logout">Logout</Link>


            </nav>
          </header>
          <main>
           
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/room" element={<Room />} />
              <Route path="/calendarPage" element={<CalendarPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/CalendarDayView" element={<CalendarDayView />} />
              <Route path="/MoProfile" element={<MoProfile />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Mentor" element={<Mentor />} />
              <Route path="/Scheduler" element={<Scheduler />} />
              <Route path="/MenteeLoginPage" element={<MenteeLoginPage />} />
              <Route path="/MentorRegistration" element={<MentorRegistration />} />
              <Route path="/mentor-profile" element={<MentorProfile />} />
              <Route path="/edit-profile" element={<EditMentorProfile />} />
          <Route path="/MentorSearch" element={<MentorSearch />} />
          <Route path="/mentor/:name" element={<MentorDetail />} /> 
          <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />


            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
