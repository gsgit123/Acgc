import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/LandingPage.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <button onClick={() => navigate('/LoginPageTeacher')} className="landing-btn">Teacher</button>
      <button onClick={() => navigate('/LoginPageStudent')} className="landing-btn">Student</button>
    </div>
  );
};

export default LandingPage;