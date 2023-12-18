import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://lokapati.born4tech.com/api/student", {
        
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials in the request
      })
      .then((res) => setPosts(res.data));
  }, []);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Student
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
        stripedRows tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="name" sortable header="Name"></Column>
        <Column field="mobile" sortable header="iMobile"></Column>
        <Column field="address" sortable header="Address"></Column>
        <Column field="code" sortable header="Code"></Column>
      </DataTable>
    </div>
  );
};

export default Student;
