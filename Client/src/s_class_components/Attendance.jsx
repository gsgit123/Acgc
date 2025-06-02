import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#4ade80', '#f87171']; // Green (Present), Red (Absent)

// Custom label function to show percentage
const renderCustomLabel = ({ percent, name }) => {
  return `${name}: ${(percent * 100).toFixed(0)}%`;
};

const ClassAttendance = ({ classId, studentId }) => {
  const [presentDays, setPresentDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/attendance/summary/${classId}/${studentId}`);
        const { daysPresent, totalDays } = res.data;
        setPresentDays(daysPresent || 0);
        setTotalDays(totalDays || 0);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch attendance summary");
      } finally {
        setLoading(false);
      }
    };

    if (classId && studentId) {
      fetchSummary();
    }
  }, [classId, studentId]);

  const absentDays = totalDays - presentDays;
  const pieData = [
    { name: 'Present', value: presentDays },
    { name: 'Absent', value: absentDays >= 0 ? absentDays : 0 },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6 mt-10">
      {/* Summary Box */}
      <div className="bg-black text-white border border-gray-700 rounded-2xl shadow-md p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Attendance Summary</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="text-lg space-y-2 text-center">
            <p><strong>Days Present:</strong> {presentDays}</p>
            <p><strong>Total Days:</strong> {totalDays}</p>
          </div>
        )}
      </div>

      {/* Pie Chart Box */}
      <div className="bg-black text-white border border-gray-700 rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">Attendance Chart</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default ClassAttendance;
