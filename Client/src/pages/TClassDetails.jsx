import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import ClassSidebar from '../components/TSidebar';
import ClassInfo from '../t_class_components/Info';
import ClassChat from '../t_class_components/Chat';
import ClassAttendance from '../t_class_components/Attendance';


const ClassDetails = () => {
  const { classCode } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClassDetails = async () => {
    try {
      const response = await axiosInstance.get(`/class/code/${classCode}`);
      setClassData(response.data.class);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load class details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, [classCode]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!classData) return <div className="p-6 text-center text-red-600">Class not found</div>;

  return (
    <div className="flex min-h-screen">
      <ClassSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="info" />} />
          <Route path="info" element={<ClassInfo classData={classData} />} />
          <Route path="chat" element={<ClassChat classData={classData} />} />
          <Route path="attendance" element={<ClassAttendance classData={classData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ClassDetails;
