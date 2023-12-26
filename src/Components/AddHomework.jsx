import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const customStyles = `
.ql-placeholder{
  font-style: inherit;
}
`;

const AddHomework = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [homework, setHomework] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects();
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get('https://erp.studymadness.com/api/class', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setClasses(response.data.class);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    } else {
      console.error("Token not found. User is not logged in.");
    }
  };

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(`https://erp.studymadness.com/api/${selectedClass}/subject`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setSubjects(response.data.subject);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    } else {
      console.error("Token not found. User is not logged in.");
    }
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    console.log("Selected Class (before conversion):", selectedClass);
  
    // Ensure selectedClass is an integer
    const classId = parseInt(selectedClass, 10);
    console.log("Class ID (after conversion):", classId);
  
    setSelectedClass(classId);
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    console.log("Selected Subject (before conversion):", selectedSubject);
  
    // Ensure selectedSubject is an integer
    const subjectId = parseInt(selectedSubject, 10);
    console.log("Subject ID (after conversion):", subjectId);
  
    setSelectedSubject(subjectId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!selectedClass || !selectedSubject) {
      Swal.fire({
        title: "Error!",
        text: "Please select both class and subject.",
        icon: "error",
      });
      return;
    }


    const parser = new DOMParser();
    const parsedHomework = parser.parseFromString(homework, 'text/html').body.textContent;
  
  
    if (!parsedHomework.trim()) {
       
        Swal.fire({
          title: "Error!",
          text: "Homework field cannot be empty.",
          icon: "error",
        });
        return;
      }
  


    const date = new URLSearchParams(location.search).get("date");
    
    const postData = {
      classid: selectedClass,
      subjectid: selectedSubject,
      date: date,
      homework: homework,
    };
    const token = localStorage.getItem("token");
console.log(postData);
    if (token) {
      try {
        const response = await axios.post('https://erp.studymadness.com/api/homework/', postData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log("post success")
        navigate(`/dashboard/homework/${date}`);
        Swal.fire({
          title: "Added!",
          text: "Your Homework has been added.",
          icon: "success"
        });
      } catch (error) {
        console.error('Error adding homework:', error);
      }
    } else {
      console.error("Token not found. User is not logged in.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-100 border mx-5 mt-5">
      <h3 className="text-center">Add Homework</h3>
      <form className="row g-1 mt-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Class</label>
          <select className="form-control rounded-0" value={selectedClass} onChange={handleClassChange}>
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem.id-1} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Subject</label>
          <select className="form-control rounded-0" value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.school_subject.name}
              </option>
            ))}
          </select>
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
  
        <div className="col-12 text-center mt-5 ">
          <button type="submit" className=" mt-1 btn btn-primary btn-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddHomework;
