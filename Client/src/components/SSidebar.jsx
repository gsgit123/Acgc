
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const SClassSidebar = () => {
  const location = useLocation();
  const { classCode } = useParams();

  return (
    <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
      <h2 className="text-xl font-bold mb-6">Class Panel</h2>

      <Link
        to={`/class/student/${classCode}/info`}
        className={`block p-3 rounded hover:bg-gray-800 ${location.pathname.endsWith("/info") ? "bg-gray-700" : ""}`}
      >
        Info
      </Link>
      <Link
        to={`/class/student/${classCode}/chat`}
        className={`block p-3 rounded hover:bg-gray-800 ${location.pathname.endsWith("/chat") ? "bg-gray-700" : ""}`}
      >
        Chat
      </Link>
      <Link
        to={`/class/student/${classCode}/attendance`}
        className={`block p-3 rounded hover:bg-gray-800 ${location.pathname.endsWith("/attendance") ? "bg-gray-700" : ""}`}
      >
        Attendance
      </Link>
    </div>
  );
};

export default SClassSidebar;
