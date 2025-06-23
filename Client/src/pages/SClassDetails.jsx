


import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import ClassSidebar from '../components/SSidebar';
import ClassInfo from '../s_class_components/Info';
import ClassChat from '../s_class_components/Chat';
import ClassAttendance from '../s_class_components/Attendance';
import { useSAuthStore } from "../store/useSAuthStore";
import AssignmentList from '../s_class_components/AssignmentList';


const ClassDetails = () => {
  const { classCode } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSAuthStore((state) => state.authUser);

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
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-64 h-full fixed top-16 left-0 z-30 bg-[#1c2c55] border-r border-gray-700">
        <ClassSidebar />
      </div>

      {/* Scrollable content area */}
      <div className="ml-64 flex-1 h-full overflow-y-auto bg-[#0f172a] text-white">
        <Routes>
          <Route path="/" element={<Navigate to="info" />} />
          <Route path="info" element={<ClassInfo classData={classData} />} />
          <Route path="chat" element={<ClassChat classData={classData} />} />
          <Route path="attendance" element={<ClassAttendance classId={classData._id} studentId={currentUser._id} />} />
          <Route path="assignment" element={<AssignmentList/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default ClassDetails;

