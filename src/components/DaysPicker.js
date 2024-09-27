import React, { useState } from "react";
import "./DaysPicker.css";
const DaysPicker = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const setDay = (items) => {
    setSelectedDays(items);
  };

  const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  return (
    <div className="days">
      <button
        className={`days__button ${
          selectedDays.length === 3 &&
          ["ПН", "СР", "ПТ"].every((item) => selectedDays.includes(item))
            ? "selected"
            : ""
        }`}
        type="button"
        onClick={() => setDay(["ПН", "СР", "ПТ"])}
      >
        ПН/СР/ПТ
      </button>
      <button
        className={`days__button ${
          selectedDays.length === 2 &&
          ["ПН", "ВТ"].every((item) => selectedDays.includes(item))
            ? "selected"
            : ""
        }`}
        type="button"
        onClick={() => setDay(["ПН", "ВТ"])}
      >
        ПН/ВТ
      </button>
      {days.map((day) => (
        <button
          className={`days__button ${
            selectedDays.includes(day) ? "selected" : ""
          }`}
          key={day}
          type="button"
          selected={selectedDays.includes(day)}
          onClick={() => toggleDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaysPicker;
