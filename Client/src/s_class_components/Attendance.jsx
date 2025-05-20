import React from 'react';

const ClassAttendance = ({ classData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Attendance for {classData.name}</h2>
      <p>This is the attendance section.</p>
    </div>
  );
};

export default ClassAttendance;
