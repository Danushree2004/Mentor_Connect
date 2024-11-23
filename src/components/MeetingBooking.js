// src/components/Booking.js
import React, { useState } from 'react';
import axios from 'axios';

const MeetingBooking = () => {
  const [date, setDate] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [message, setMessage] = useState('');

  const handleBookSlot = async () => {
    try {
      await axios.post('/api/book-slot', { date, mentorId });
      setMessage('Slot booked successfully!');
    } catch (error) {
      setMessage('Error booking slot.');
    }
  };

  return (
    <div className="Booking">
      <h2>Book a Meeting</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Mentor ID:
          <input
            type="text"
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
            required
          />
        </label>
        <label>
          Date and Time:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleBookSlot}>Book Slot</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MeetingBooking;
