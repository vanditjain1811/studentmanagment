import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
const Homework = () => {

    const { selectedDate } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (token) {
            axios
                .get(`https://erp.studymadness.com/api/homework/${selectedDate}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include credentials in the request
                })
                .then((res) =>{ 
                setPosts(res.data.homework);
                console.log(res.data);
            })
                .catch((error) => {
                    // Handle error
                    console.error("Error fetching data:", error.response ? error.response.data : error.message);
                });
        } else {
            // Handle the case where the token is not available (user is not logged in)
            console.error("Token not found. User is not logged in.");
        }
    }, []);

  return (
    <div>
<div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Homework for {selectedDate} </h3>
            </div>
            <Link to={`/dashboard/add_homework?date=${selectedDate}`} className="btn btn-success mb-3">
                Add Homework
            </Link>
            <DataTable
                value={posts}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                dataKey="id"
                paginator
                emptyMessage="No data found."
                className="datatable-responsive"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
                rows={10}
                stripedRows
                tableStyle={{ minWidth: '50rem' }}
            >
            
            <Column field="class_name" sortable header="Class"></Column>
            <Column field="subject_name" sortable header="Subject"></Column>
            
            </DataTable>
        </div>
</div>
  )
}

export default Homework