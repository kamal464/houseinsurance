import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home/login page after rendering the NotFound message
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
