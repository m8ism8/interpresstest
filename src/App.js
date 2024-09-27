import React, { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div className="main">
        <h1>Расписание курсов</h1>
        <button className="main__button" onClick={() => setShowModal(true)}>
          Создать расписание
        </button>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}

export default App;
