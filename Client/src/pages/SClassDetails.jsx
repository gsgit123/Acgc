// // src/pages/ClassDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { axiosInstance } from '../lib/axios';
// import { toast } from 'react-hot-toast';

// const ClassDetails = () => {
//   const { classCode } = useParams();
//   const [classData, setClassData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchClassDetails = async () => {
//     try {
//       const response = await axiosInstance.get(`/class/code/${classCode}`);
//       setClassData(response.data.class);
//       console.log(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load class details");
//     } finally {
//       setLoading(false);
//     }
//   };
// // console.log(classData);
//   useEffect(() => {
//     fetchClassDetails();
//   }, [classCode]);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (!classData) return <div className="p-6 text-center text-red-600">Class not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{classData.name}</h1>
//       <p><strong>Student</strong></p>
//       <p><strong>Subject:</strong> {classData.subject}</p>
//       <p><strong>Class Code:</strong> {classData.classCode}</p>
//       <p><strong>Teacher:</strong> {classData.createdBy?.fullName || 'Unknown'}</p>

//     </div>
//   );
// };

// export default ClassDetails;


import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import ClassSidebar from '../components/SSidebar';
import ClassInfo from '../s_class_components/Info';
import ClassChat from '../s_class_components/Chat';
import ClassAttendance from '../s_class_components/Attendance';
import { useSAuthStore } from "../store/useSAuthStore";


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
    <div className="flex min-h-screen">
      <ClassSidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="info" />} />
          <Route path="info" element={<ClassInfo classData={classData} />} />
          <Route path="chat" element={<ClassChat classData={classData} />} />
          <Route path="attendance" element={<ClassAttendance classId={classData._id} studentId={currentUser._id}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default ClassDetails;

