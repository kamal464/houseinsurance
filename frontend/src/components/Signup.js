import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  API_BASE_URL from '../config/config'


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      console.log(response.data); // Handle successful signup
      navigate('/');
      // Optionally, redirect to another page upon successful signup
      // Example: navigate('/login');
    } catch (error) {
      console.error(error.response.data); // Handle signup error
      // Optionally, display an error message to the user
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Signup" style={{ width: '400px', padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '20px', fontSize: '16px' }}>
            <div style={{ marginBottom: '5px' }}>Username</div>
            <InputText id="username" type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', fontSize: '16px' }} />
          </div>
          <div style={{ marginBottom: '20px', fontSize: '16px' }}>
            <div style={{ marginBottom: '5px' }}>Email</div>
            <InputText id="email" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', fontSize: '16px' }} />
          </div>
          <div style={{ marginBottom: '20px', fontSize: '16px' }}>
            <div style={{ marginBottom: '5px' }}>Password</div>
            <InputText id="password" type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', fontSize: '16px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" label="Signup" className="p-button-success" style={{ marginRight: '10px', fontSize: '16px' }} />
            <Button label="Login" onClick={handleLoginClick} className="p-button-secondary" style={{ fontSize: '16px' }} />
          </div>
        </form>
      </Card>
    </div>
  );
  
};

export default Signup;
