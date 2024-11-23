import React, { useContext, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GlobalContext from './context/GlobalContext';

const DayView = () => {
  const { daySelected, setDaySelected } = useContext(GlobalContext);
  const [events, setEvents] = useState([]); // Replace with real event fetching logic

  const handlePrevDay = () => {
    setDaySelected(daySelected.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setDaySelected(daySelected.add(1, 'day'));
  };

  const fetchEventsForDay = (date) => {
    // This should fetch events from your state or API for the given day
    // For demo purposes, we'll use a static array
    const sampleEvents = [
      { id: 1, title: "Meeting", start: "09:00 AM", end: "10:00 AM" },
      { id: 2, title: "Lunch", start: "12:00 PM", end: "01:00 PM" },
    ];
    setEvents(sampleEvents);
  };

  React.useEffect(() => {
    fetchEventsForDay(daySelected);
  }, [daySelected]);

  return (
    <div className="day-view">
      <header className="day-header">
        <button onClick={handlePrevDay}>
          <FaChevronLeft />
        </button>
        <h2>{daySelected.format('MMMM DD, YYYY')}</h2>
        <button onClick={handleNextDay}>
          <FaChevronRight />
        </button>
      </header>
      <div className="day-schedule">
        {events.length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event">
              <h3>{event.title}</h3>
              <p>{event.start} - {event.end}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DayView;
