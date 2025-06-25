import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ClassContext } from '../pages/SClassDetails'; // <-- import the context
import { axiosInstance } from '../lib/axios';

const ClassInfo = () => {
  const { classData, studentId } = useContext(ClassContext); // ✅ get data from context
  const [pendingCount, setPendingCount] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const res = await axios.get(
          `/assignments/pending/${classData.classCode}/${studentId}`
        );
        setPendingCount(res.data.count);
      } catch (err) {
        console.error('Error fetching pending assignments:', err);
        setError('Failed to load pending assignments');
      } finally {
        setLoading(false);
      }
    };

    if (classData && studentId) {
      fetchPendingAssignments();
    }
  }, [classData, studentId]);

  return (
    <div className="inset-0 w-full h-full bg-[#0b0f19] text-white font-['Nunito'] flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-[#1e293b] rounded-xl shadow-2xl p-10 w-full max-w-3xl transition hover:shadow-emerald-500/30 hover:ring-2 hover:ring-emerald-500">
        <h1 className="text-4xl font-bold text-emerald-400 mb-4">{classData.name}</h1>
        <p className="text-sm text-gray-400 mb-6">Student View</p>

        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold text-white">Subject:</span>{' '}
            <span className="text-gray-300">{classData.subject}</span>
          </p>
          <p>
            <span className="font-semibold text-white">Class Code:</span>{' '}
            <span className="text-gray-300">{classData.classCode}</span>
          </p>
          <p>
            <span className="font-semibold text-white">Teacher:</span>{' '}
            <span className="text-gray-300">{classData.createdBy?.fullName || 'Unknown'}</span>
          </p>
          <p>
            <span className="font-semibold text-white">Pending Assignments:</span>{' '}
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <span className="text-red-400 font-bold">{pendingCount}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
