import React from 'react';

const ClassInfo = ({ classData }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{classData.name}</h1>
      <p>Student</p>
      <p><strong>Subject:</strong> {classData.subject}</p>
      <p><strong>Class Code:</strong> {classData.classCode}</p>
      <p><strong>Teacher:</strong> {classData.createdBy?.fullName || 'Unknown'}</p>
    </div>
  );
};

export default ClassInfo;
