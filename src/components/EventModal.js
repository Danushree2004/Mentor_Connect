import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/GlobalContext";
import './EventModal.css';
import { IoMdTime } from "react-icons/io";
import { MdSegment, MdDeleteOutline, MdDragHandle } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import Swal from 'sweetalert2';

const labelsClasses = [
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [startDate, setStartDate] = useState(
    selectedEvent ? selectedEvent.startDate : daySelected.format("YYYY-MM-DD")
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : "09:00"
  );
  const [endDate, setEndDate] = useState(
    selectedEvent ? selectedEvent.endDate : daySelected.format("YYYY-MM-DD")
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : "17:00"
  );

  useEffect(() => {
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const reminderTime = new Date(endDateTime.getTime() - 5 * 60000); // 5 minutes before end time
    const timeUntilReminder = reminderTime.getTime() - Date.now();

    if (timeUntilReminder > 0) {
      const timeoutId = setTimeout(() => {
        Swal.fire({
          title: "Reminder!",
          text: `Your event "${title}" is ending in 5 minutes.`,
          icon: "info",
        });
      }, timeUntilReminder);

      return () => clearTimeout(timeoutId);
    }
  }, [endDate, endTime, title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      startDate,
      startTime,
      endDate,
      endTime,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);

    const formData = new FormData(e.target);

    formData.append("access_key", "d1bd5dae-e0b8-4c24-b477-7fa8c3cbbf8d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success"
      });
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="formc" onSubmit={handleSubmit}>
        <header className="headerc">
          <span className="material-icons-outlined text-gray-400">
            <MdDragHandle />
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined align-right"
              >
                <MdDeleteOutline />
              </span>
            )}
          </div>
          <div>
            <button type="button" onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined">
                <IoMdClose />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined">
              <IoMdTime />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>

            <span className="material-icons-outlined">
              <MdSegment />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Start Date and Time */}
            <span className="material-icons-outlined">
              <IoMdTime />
            </span>
            <div className="flex gap-x-2">
              <input
                type="date"
                name="startDate"
                value={startDate}
                required
                className="border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                name="startTime"
                value={startTime}
                required
                className="border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            {/* End Date and Time */}
            <span className="material-icons-outlined">
              <IoMdTime />
            </span>
            <div className="flex gap-x-2">
              <input
                type="date"
                name="endDate"
                value={endDate}
                required
                className="border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                name="endTime"
                value={endTime}
                required
                className="border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <span className="material-icons-outlined">
              <FaRegBookmark />
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      <IoMdCheckmark />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="footerc">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
