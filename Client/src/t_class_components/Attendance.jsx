import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const ClassAttendance = ({ classData }) => {
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/attendance/class/${classData._id}/date/${date}`);
      if (res.data.attendance.length === 0) {
        setAttendance(
          classData.students.map(student => ({
            studentId: student._id,
            fullName: student.fullName,
            status: 'present'
          }))
        );
      } else {
        setAttendance(
          classData.students.map(student => {
            const record = res.data.attendance.find(a => a.student._id === student._id);
            return {
              studentId: student._id,
              fullName: student.fullName,
              status: record ? record.status : 'present'
            };
          })
        );
      }
    } catch (err) {
      toast.error('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, [date, classData._id]);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev =>
      prev.map(a => (a.studentId === studentId ? { ...a, status } : a))
    );
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post(`/attendance/class/${classData._id}/date/${date}`, {
        attendance: attendance.map(a => ({
          studentId: a.studentId,
          status: a.status
        }))
      });
      toast.success('Attendance saved!');
    } catch {
      toast.error('Failed to save attendance');
    }
  };

  return (
    <div className="pt-6 px-4 min-h-full bg-[#0b0f19] text-white font-['Nunito']">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-sky-400 text-center">Class Attendance 📅</h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <label className="text-lg font-medium">
            Select Date:{" "}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="ml-2 bg-[#1e293b] border border-gray-700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>
        </div>

        <div className="overflow-x-auto bg-[#1e293b] border border-gray-700 rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#0f172a] text-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3 text-center">Present</th>
                <th className="px-4 py-3 text-center">Absent</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(student => (
                <tr key={student.studentId} className="border-t border-gray-700">
                  <td className="px-4 py-3">{student.fullName}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="radio"
                      checked={student.status === 'present'}
                      onChange={() => handleStatusChange(student.studentId, 'present')}
                      className="accent-green-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="radio"
                      checked={student.status === 'absent'}
                      onChange={() => handleStatusChange(student.studentId, 'absent')}
                      className="accent-red-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <button
            className={`px-6 py-2 rounded-md font-semibold transition ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendance;
