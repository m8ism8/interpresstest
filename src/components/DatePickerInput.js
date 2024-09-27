import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerInput.css";

const DatePickerInput = ({ selectedDate, onChange }) => {
  const dateToDisplay = selectedDate || new Date();

  return (
    <label className="datepick">
      <DatePicker
        className="datepick__input"
        selected={dateToDisplay}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
      />
    </label>
  );
};

export default DatePickerInput;
