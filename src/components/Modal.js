import React from "react";
import ScheduleForm from "./ScheduleForm";
import "./Modal.css";

const Modal = ({ onClose }) => {
  return (
    <div className="wrapper">
      <div className="content">
        <h2>Создание расписания</h2>
        <ScheduleForm onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
