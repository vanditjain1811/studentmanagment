import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js/dist/umd/popper.min.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import { useNavigate } from 'react-router-dom';

const HomeworkCalendar = () => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleDateClick = (arg) => {
    // const modal = modalRef.current;
    // modal.classList.add('show');
    // modal.style.display = 'block';
    // const modalBody = modal.querySelector('.modal-body');
    // modalBody.innerHTML = `<h3>${arg.dateStr}</h3>`;
    const selectedDate = arg.dateStr;
    navigate(`/dashboard/homework/${selectedDate}`);
  };

  // const handleCloseModal = () => {
  //   const modal = modalRef.current;
  //   modal.classList.remove('show');
  //   modal.style.display = 'none';
  // };

  return (
    <div>
      <div className="jumbotron text-center">
        <h3></h3>
      </div>

      <div className="container" style={{ height: 'auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          height="auto"
        />
      </div>

      {/* <div className="modal" id="myModal" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title align-center">Add Event</h4>
              <button type="button" className="close" onClick={handleCloseModal}>&times;</button>
            </div>

            <div className="modal-body text-center">

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomeworkCalendar;
