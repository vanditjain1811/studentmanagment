import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddHomework = () => {

    const [name, setName] = useState("");
    // const [category, setCategory] = useState([]);
    const navigate = useNavigate()
    const [submitStatus, setSubmitStatus] = useState(null);
  
    // useEffect(() => {
    //   axios
    //     .get("http://localhost:3000/auth/category")
    //     .then((result) => {
    //       if (result.data.Status) {
    //         setCategory(result.data.Result);
    //       } else {
    //         alert(result.data.Error);
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault()
     
  
      try {
        const response = await axios.post('https://lokapati.born4tech.com/api/class', {
          name: name,
        });
  
        if (response.data && response.data.status === 'success') {
          
          setSubmitStatus('Success!');
        } else {
          setSubmitStatus('Failed. Please try again.');
        }
      } catch (error) {
        console.error('Error posting data:', error);
        setSubmitStatus('Failed. Please try again.');
      }
     
    }
  

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Add Homework</h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">
           Class
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className="col-12">
          <label className="form-label">
           Subject
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className="col-12">
          <label className="form-label">
          Homework
          </label>
          <input
            type="textarea"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            
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
  )
}

export default AddHomework