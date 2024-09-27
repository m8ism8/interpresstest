import React, { useState, useEffect } from "react";
import DatePickerInput from "./DatePickerInput";
import DaysPicker from "./DaysPicker";
import "./ScheduleForm.css";

const ScheduleForm = ({ onClose }) => {
  const [totalHours, setTotalHours] = useState(3);
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [breakOption, setBreakOption] = useState(false);
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("08:00");
  const [teacher, setTeacher] = useState("Not selected");
  const [classroom, setClassroom] = useState("not selected");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    console.log("Selected Days Updated:", selectedDays);
  }, [selectedDays]);

  useEffect(() => {
    calculateEndTime();
  }, [startTime, hoursPerDay, breakOption]);

  const calculateEndTime = () => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    let totalMinutes = startHour * 60 + startMinute;
    const minutesPerDay = hoursPerDay * 60;

    if (breakOption) {
      totalMinutes += minutesPerDay + 15;
    } else {
      totalMinutes += minutesPerDay;
    }

    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;
    setEndTime(formattedEndTime);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      totalHours,
      hoursPerDay,
      breakOption,
      startTime,
      endTime,
      startDate,
      endDate,
      selectedDays,
      teacher,
      classroom,
    });
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="schedule">
        {/* Тип часов */}
        <label className="schedule__label">
          <select className="schedule__select" required>
            <option value="academic">Академические (45 мин)</option>
            <option value="astronomic">Астрономические (60 мин)</option>
          </select>
        </label>

        {/* Общее количество часов */}
        <label className="schedule__label">
          <div className="schedule__hours">
            <button type="button" onClick={() => setTotalHours(totalHours - 1)}>
              -
            </button>
            <input
              className="schedule__input"
              required
              type="number"
              value={totalHours}
              onChange={(e) => setTotalHours(Number(e.target.value))}
            />
            <span className="label">Всего часов</span>
            <button type="button" onClick={() => setTotalHours(totalHours + 1)}>
              +
            </button>
          </div>
        </label>

        {/* Даты начала и окончания */}
        <div className="schedule__date">
          <DatePickerInput selectedDate={startDate} onChange={setStartDate} />
          <span className="label">До</span>
          <DatePickerInput selectedDate={endDate} onChange={setEndDate} />
        </div>

        {/* Выбор дней недели */}
        <DaysPicker
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />

        {/* Перерыв */}
        <label className="schedule__label">
          <select onChange={(e) => setBreakOption(e.target.value === "yes")}>
            <option value="no">Без перерыва</option>
            <option value="yes">С перерывом</option>
          </select>
        </label>

        {/* Часы в день */}
        <label className="schedule__label">
          <div className="schedule__hours">
            <button
              type="button"
              onClick={() => setHoursPerDay(hoursPerDay - 1)}
            >
              -
            </button>
            <input
              className="schedule__input"
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
            />
            <span className="label">Часов в день</span>
            <button
              type="button"
              onClick={() => setHoursPerDay(hoursPerDay + 1)}
            >
              +
            </button>
          </div>
        </label>

        <div className="schedule__date">
          <label className="schedule__label">
            <input
              className="schedule__input"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <span className="label">До</span>

          <label className="schedule__label">
            <input
              className="schedule__input"
              type="time"
              value={endTime}
              readOnly
            />
          </label>
        </div>

        {/* Преподаватель и аудитория */}
        <label className="schedule__label big-input">
          <select
            className="schedule__select"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          >
            <option value="Not selected">
              Выберите преподавателя на это время
            </option>
            <option value="Темирлан Аубакиров">Темирлан Аубакиров</option>
          </select>
        </label>
        <label className="schedule__label">
          <select
            className="schedule__select"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          >
            <option value="not selected">Аудитория</option>
            <option value="Актовый зал">Актовый зал</option>
          </select>
        </label>
      </div>
      <div className="schedule__buttons">
        <button className="schedule__cancel" type="button" onClick={onClose}>
          Отмена
        </button>
        <button className="schedule__submit" type="submit">
          Добавить расписание
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
