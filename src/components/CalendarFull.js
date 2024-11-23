import React, { useContext } from 'react'; // Import useContext from React
import GlobalContext from './context/GlobalContext'; // Import your GlobalContext
import CalendarHeader from './CalendarHeader'; // Import CalendarHeader
import DayView from './DayView'; // Import DayView
import WeekView from './WeekView'; // Import WeekView

function CalendarFull() {
  const { daySelected, view } = useContext(GlobalContext); // Get view from context or manage it locally

  return (
    <>
      <CalendarHeader />
      {view === "Day" && <DayView daySelected={daySelected} />}
      {view === "Week" && <WeekView />}
      {/* Add other view components if needed */}
    </>
  );
}

export default CalendarFull;
