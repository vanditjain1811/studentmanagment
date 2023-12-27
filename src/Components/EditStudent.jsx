import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    fatherName: "",
    motherName: "",
    gender: "",
    religion: "",
    dob: "",
    profileImage: "",
    dateOfAdmission: "",
    year: "",
    class: "",
  });

  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    // Fetch student data for editing
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`https://erp.studymadness.com/api/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          const studentData = response.data.students; // Assuming the API returns student data
          setFormData({
            name: studentData.name,
            email: studentData.email,
            mobile: studentData.mobile,
            address: studentData.address,
            fatherName: studentData.fname,
            motherName: studentData.mname,
            gender: studentData.gender,
            religion: studentData.religion,
            dob: studentData.dob,
            profileImage: studentData.profile_photo_url,
            dateOfAdmission: studentData.join_date,
            year: studentData.asignstudent[0].year_id,
            class: studentData.asignstudent[0].class_id,
           
          });
          console.log(response.data.students);
          
        })
        .catch((error) => {
          console.error("Error fetching student data for editing:", error);
        });
        axios
        .get("https://erp.studymadness.com/api/year", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          setSessions(response.data.year.allData);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
  
      // Fetch classes from API
      axios
        .get("https://erp.studymadness.com/api/class", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          setClasses(response.data.class);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    } else {
      console.error("Token not found. User is not logged in.");
      // Handle the case where the token is not available (user is not logged in)
    }

    // Fetch sessions from API
   
  }, []);
   // Dependency on studentId ensures that this effect runs when the studentId changes

   console.log(formData.year);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission for editing
    console.log("Form data for editing submitted:", formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <div className="p-3 rounded w-100 border mx-5 mt-2">
        <h3 className="text-center">Edit Student</h3>
        <form className="row g-3 mt-3" onSubmit={handleEditSubmit}>
        <div className="col-md-4">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            className="form-control"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Mother's Name</label>
          <input
            type="text"
            className="form-control"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date of Birth (DOB)</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            placeholder="Enter Date of Birth"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Date of Admission</label>
          <input
            type="date"
            className="form-control"
            name="dateOfAdmission"
            value={formData.dateOfAdmission}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
            <label className="form-label">Religion</label>
            <input
              type="text"
              className="form-control"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
          </div>
       
          <div className="col-md-4">
            <label className="form-label">Session</label>
            <select
              className="form-control"
              name="session"
              
              onChange={handleChange}
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id} selected={session.id===formData.year} >
                  {session.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Class</label>
            <select
              className="form-control"
              name="class"
            
              onChange={handleChange}
            >
              <option value=""> Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id} selected={classItem.id===formData.class}>
                  {classItem.name}
                </option>
              ))}
            </select>
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

export default EditStudent;
