// src/pages/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({ username: '', email: '', status: 'active' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://employee-sever.onrender.com/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://employee-sever.onrender.com/employees/${id}`, employee)
      .then(() => navigate('/'));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Employee</h1>
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
        <button type="submit" className="btn btn-info">Save</button>
      </form>
    </div>
  );
};

export default EditEmployee;
