import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();   
    navigate('/');         
  }, [navigate]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default Logout;
