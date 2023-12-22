import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const customStyles = `

.ql-placeholder{
  font-style: inherit;
}
`;

const AddHomework = () => {
  const navigate = useNavigate();
  const [homework, setHomework] = useState("");
   const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    // Fetch classes from the API
    fetchClasses();
  }, []);
  useEffect(() => {
    if (selectedClass) {
      // Fetch subjects for the selected class from the API
      fetchSubjects();
    }
  }, [selectedClass]);
  

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");

    // Check if the token is available
    if (token) {
    try {
      const response = await axios.get('https://erp.studymadness.com/api/class', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials in the request
    })
      setClasses(response.data.class); 
      console.log(response.data);
      // assuming the API returns an object with a 'class' property
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }
  else {
    // Handle the case where the token is not available (user is not logged in)
    console.error("Token not found. User is not logged in.");
}
  };
  
  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");

    // Check if the token is available
    if (token) {
    try {
      // Fetch subjects for the selected class from the API
      const response = await axios.get(`https://erp.studymadness.com/api/${selectedClass}/subject`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials in the request
    })
      setSubjects(response.data.subject); // assuming the API returns an object with a 'subject' property
      console.log(response.data); // assuming the API returns an object with a 'subject' property
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  }
  else {
    // Handle the case where the token is not available (user is not logged in)
    console.error("Token not found. User is not logged in.");
}
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    console.log(selectedClass);
    // Fetch subjects for the selected class when the class changes
   
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
  };


  


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <style>{customStyles}</style>
        <h3 className="text-center">Add Homework</h3>
        <form className="row g-1" >
          <div className="col-12">
            <label className="form-label">Class</label>

            <select  className="form-control rounded-0" value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {classes.map((classItem) => (
            <option key={classItem.id-1} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
          </div>
          <div className="col-12">
            <label className="form-label">Subject</label>
            <select className="form-control rounded-0" value={selectedSubject} onChange={handleSubjectChange}>
          <option  value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.school_subject.name}
            </option>
          ))}
        </select>
          </div>
          <div className="col-12">
            <label className="form-label">Homework</label>
            <ReactQuill
              theme="snow"
              value={homework}
              onChange={(value) => setHomework(value)}
              style={{ height: "200px" }}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomework;
