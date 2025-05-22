import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const ClassAttendance = ({ classData }) => {
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch attendance for selected date
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/attendance/class/${classData._id}/date/${date}`);
      // If no records, initialize all as 'present'
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
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance</h2>
      <label>
        Date:{' '}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-1 rounded"
        />
      </label>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Present</th>
            <th className="px-2 py-1">Absent</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(student => (
            <tr key={student.studentId}>
              <td className="border px-2 py-1">{student.fullName}</td>
              <td className="border px-2 py-1 text-center">
                <input
                  type="radio"
                  checked={student.status === 'present'}
                  onChange={() => handleStatusChange(student.studentId, 'present')}
                />
              </td>
              <td className="border px-2 py-1 text-center">
                <input
                  type="radio"
                  checked={student.status === 'absent'}
                  onChange={() => handleStatusChange(student.studentId, 'absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Attendance'}
      </button>
    </div>
  );
};

export default ClassAttendance;

