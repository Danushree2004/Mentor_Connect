import React from 'react';
import Day from './Day';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WeekView = () => {
  const today = Day();
  const startOfWeek = today.startOf('week');
  const endOfWeek = today.endOf('week');

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, 'day'));
  }

  return (
    <div className="week-view">
      <header className="week-header">
        <button>
          <FaChevronLeft />
        </button>
        <h2>{`${startOfWeek.format('MMMM YYYY')} - Week ${startOfWeek.week()}`}</h2>
        <button>
          <FaChevronRight />
        </button>
      </header>
      <div className="week-grid">
        {days.map(day => (
          <div key={day.format('YYYY-MM-DD')} className="day">
            <h3>{day.format('dddd')}</h3>
            <p>{day.format('MMMM DD, YYYY')}</p>
            {/* Placeholder for events or content */}
            <div className="events">
              {/* Event entries would go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
