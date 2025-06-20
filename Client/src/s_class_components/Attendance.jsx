import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#4ade80', '#f87171']; // Green (Present), Red (Absent)

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

  const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 'N/A';
  const percentageColor = percentage < 75 ? 'text-red-400' : 'text-green-400';

  return (
    <div className="min-h-full px-4 pt-10 bg-[#0b0f19] text-white font-['Nunito']">
      <div className="max-w-4xl mx-auto rounded-xl shadow-2xl bg-[#0f172a] border border-gray-700 overflow-y-auto">

        {/* Header */}
        <div className="text-center text-3xl font-bold text-sky-400 py-6 border-b border-gray-700">
          Attendance Overview 📊
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 p-8 bg-[#1e293b]">
          {/* Summary Card */}
          <div className="flex-1 bg-[#0f172a] border border-gray-700 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-400">Attendance Summary</h2>
            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : (
              <div className="text-lg space-y-3 text-center">
                <p><span className="text-sky-400 font-medium">Days Present:</span> {presentDays}</p>
                <p><span className="text-sky-400 font-medium">Total Days:</span> {totalDays}</p>
                <p>
                  <span className="text-sky-400 font-medium">Attendance %:</span>{' '}
                  <span className={`font-bold ${percentageColor}`}>
                    {percentage === 'N/A' ? 'N/A' : `${percentage}%`}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Chart Card */}
          <div className="flex-1 bg-[#0f172a] border border-gray-700 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-400">Attendance Chart</h2>
            <div className="flex justify-center">
              <PieChart width={280} height={280}>
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
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  labelStyle={{ color: '#f1f5f9', fontWeight: '500' }}
                  itemStyle={{ color: '#f1f5f9', fontWeight: '500' }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendance;
