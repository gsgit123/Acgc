import React, { useEffect, useState, createContext } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import ClassSidebar from '../components/TSidebar';
import { useTAuthStore } from '../store/useTAuthStore';

// ✅ Context to share classData and teacherId
export const ClassContext = createContext();

const TClassDetails = () => {
  const { classCode } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useTAuthStore((state) => state.authUser);

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
    <ClassContext.Provider value={{ classData, teacherId: currentUser._id }}>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <div className="w-64 h-full fixed top-16 left-0 z-30 bg-[#1c2c55] border-r border-gray-700">
          <ClassSidebar />
        </div>

        {/* Scrollable content area */}
        <div className="ml-64 flex-1 h-full overflow-y-auto bg-[#0f172a] text-white">
          <Outlet context={{ classData, teacherId: currentUser._id }} />
        </div>
      </div>
    </ClassContext.Provider>
  );
};

export default TClassDetails;
