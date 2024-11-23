import React, { useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import { IoCreateOutline } from "react-icons/io5";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <span className="pl-3 pr-7"><IoCreateOutline/> Create</span>
    </button>
  );
}