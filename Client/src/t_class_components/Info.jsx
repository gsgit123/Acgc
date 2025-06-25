import React, { useEffect, useState, useContext } from 'react';
import { axiosInstance } from '../lib/axios.js';
import { ClassContext } from '../pages/TClassDetails';

const Info = () => {
  const { classData } = useContext(ClassContext);
  const classCode = classData?.classCode;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get(`/attendance/class/${classCode}/students`);
        setStudents(res.data.students || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    if (classCode) fetchStudents();
  }, [classCode]);

  return (
    <div className="h-full px-4 pt-10 bg-[#0b0f19] text-white font-['Nunito']">
      <div className="max-w-4xl mx-auto rounded-xl shadow-2xl bg-[#0f172a] border border-gray-700 overflow-y-auto">
        <div className="text-center text-3xl font-bold text-sky-400 py-6 border-b border-gray-700">
          Enrolled Students 📋
        </div>

        <div className="p-6 bg-[#1e293b] overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-400">Loading students...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : students.length === 0 ? (
            <p className="text-center text-gray-400">No students enrolled in this class.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-[#334155]">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700 text-left text-sky-400">#</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-left text-sky-400">Full Name</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-left text-sky-400">Email</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center text-sky-400">Present</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center text-sky-400">Total</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-center text-sky-400">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id} className="hover:bg-[#2d3a4e] transition">
                    <td className="px-4 py-3 border-b border-gray-700 text-white text-center">{index + 1}</td>
                    <td className="px-4 py-3 border-b border-gray-700 text-white">{student.fullName}</td>
                    <td className="px-4 py-3 border-b border-gray-700 text-white">{student.email}</td>
                    <td className="px-4 py-3 border-b border-gray-700 text-white text-center">{student.daysPresent}</td>
                    <td className="px-4 py-3 border-b border-gray-700 text-white text-center">{student.totalDays}</td>
                    <td className={`px-4 py-3 border-b border-gray-700 text-center font-semibold ${
                      parseFloat(student.attendancePercentage) < 75 ? "text-red-500" : "text-green-400"
                    }`}>
                      {student.attendancePercentage === 'N/A' ? 'N/A' : `${student.attendancePercentage}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
