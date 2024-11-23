import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import GlobalContext from "./context/GlobalContext";
import { FaGreaterThan, FaLessThan, FaCalendarAlt } from "react-icons/fa";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [year, setYear] = useState(dayjs().year());
  const [day, setDay] = useState(dayjs().date());
  const [viewMode, setViewMode] = useState("day");

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setYear(dayjs().year());
    setDay(dayjs().date());
  };

  const handleMonthChange = (e) => {
    setMonthIndex(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  const handleDayChange = (e) => {
    setDay(Number(e.target.value));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="mr-10 text-xl text-gray-500 font-bold">
          <FaCalendarAlt /> Calendar
        </h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <FaLessThan />
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <FaGreaterThan />
          </span>
        </button>
        <h2 className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(year, monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>

      <div className="flex items-center">
        <select
          value={monthIndex}
          onChange={handleMonthChange}
          className="border rounded py-2 px-3 mr-3"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option value={i} key={i}>
              {dayjs(new Date(dayjs().year(), i)).format("MMMM")}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={handleYearChange}
          className="border rounded py-2 px-3 mr-3"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <option value={dayjs().year() - 40 + i} key={i}>
              {dayjs().year() - 40 + i}
            </option>
          ))}
        </select>
        <select
          value={day}
          onChange={handleDayChange}
          className="border rounded py-2 px-3"
        >
          {Array.from({ length: dayjs().daysInMonth() }).map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
       
      </div>
    </header>
  );
}
