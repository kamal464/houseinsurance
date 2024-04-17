import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import API_BASE_URL from '../config/config';

function Login({ setLoggedIn }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      console.log(response.data); // Handle successful login
      // Save login information to localStorage
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userData', JSON.stringify(response.data)); // Save user data

      // Set loggedIn state to true
      setLoggedIn(true);
  
      // Include the JWT token in the request headers for authenticated requests
      const token = response.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Redirect to the homeinsurancelist page
      navigate('/homeinsurancelist');
    } catch (error) {
      console.error(error.response.data); // Handle login error
    }
  };
  

  const handleSignUpClick = () => {
    navigate('/signup'); // Use navigate to navigate to signup page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login" style={{ width: '400px', padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '20px', fontSize: '16px' }}>
            <div style={{ marginBottom: '5px' }}>Email</div>
            <InputText id="email" type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', fontSize: '16px' }} />
          </div>
          <div style={{ marginBottom: '20px', fontSize: '16px' }}>
            <div style={{ marginBottom: '5px' }}>Password</div>
            <InputText id="password" type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', fontSize: '16px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" label="Login" className="p-button-success" style={{ marginRight: '10px', fontSize: '16px' }} />
            <Button label="Sign Up" onClick={handleSignUpClick} className="p-button-secondary" style={{ fontSize: '16px' }} />
          </div>
        </form>
      </Card>
    </div>
  );
  
  
  
}

export default Login;
