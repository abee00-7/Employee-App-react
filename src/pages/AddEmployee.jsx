// src/pages/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({ username: '', email: '', status: 'active' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://employee-sever.onrender.com/employees', employee)
      .then(() => navigate('/'));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" className="form-control" name="username" value={employee.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select className="form-select" name="status" value={employee.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
