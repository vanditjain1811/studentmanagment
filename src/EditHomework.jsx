import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const customStyles = `
.ql-placeholder {
  font-style: inherit;
}
`;

const EditHomework = () => {
  const navigate = useNavigate();
  const { homeworkId } = useParams();
  const [homework, setHomework] = useState("");

  const [selectedClass, setSelectedClass] = useState('');

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch the homework data and class/subject options
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Fetch homework details
        const response = await axios.get(`https://erp.studymadness.com/api/homeworkedit/${homeworkId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });


        const { className, subjectName, homework,date } = response.data.homework;
        console.log(response.data);

        
        setHomework(homework);
        setSelectedClass(className);
        setSelectedSubject(subjectName);
        setSelectedDate(date);

        console.log(homework);
        // Set state
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.error("Token not found. User is not logged in.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      homework: homework,
    };

    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Update homework
        await axios.put(`https://erp.studymadness.com/api/homeworkupdate/${homeworkId}`, postData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        // Show success message
        navigate(`/dashboard/homework/${selectedDate}`);
        Swal.fire({
            title: "Updated!",
            text: "Your Homework has been updated.",
            icon: "success"
          });
      } catch (error) {
        console.error('Error updating homework:', error);
      }
    } else {
      console.error("Token not found. User is not logged in.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-100 border mx-5 mt-5">
        <h3 className="text-center">Edit Homework</h3>
        <form className="row g-1 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Class</label>
            <input type="text" className="form-control" value={selectedClass} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Subject</label>
            <input type="text" className="form-control" value={selectedSubject} readOnly />
          </div>
          <div className="col-12 mb-5">
            <label className="form-label">Homework</label>
            <ReactQuill
              theme="snow"
              value={homework}
              onChange={(value) => setHomework(value)}
              style={{ height: "150px" }}
            />
          </div>
          <div className="col-12 text-center mt-5">
            <button type="submit" className="mt-1 btn btn-primary btn-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHomework;
