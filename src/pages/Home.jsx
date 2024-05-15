// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://employee-sever.onrender.com/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`https://employee-sever.onrender.com/employees/${id}`)
      .then(() => setEmployees(employees.filter(employee => employee.id !== id)));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee List</h1>
      
      <table className="table table-striped">
        <thead>
          <tr>
          
            <th>Employee Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
          
              <td>{employee.username}</td> {/* Displaying Employee Name */}
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                <Link to={`/edit/${employee.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button  onClick={() => deleteEmployee(employee.id)} className="btn btn-danger ms-2 btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mb-3">
        <Link to="/add" className="btn btn-danger">Add Employee</Link>
      </div>
    </div>
  );
};

export default Home;
