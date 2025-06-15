import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/LandingPage.css';
import { GraduationCap, School } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [fadeClass, setFadeClass] = useState('');

  const handleNavigate = (path) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <div className={`landing-container ${fadeClass}`}>
      <div className="button-row">
        <button onClick={() => handleNavigate('/LoginPageTeacher')} className="landing-btn">
          <School className="icon" />
          <span>Teacher</span>
        </button>
        <button onClick={() => handleNavigate('/LoginPageStudent')} className="landing-btn">
          <GraduationCap className="icon" />
          <span>Student</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;