import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();  // Get current location

    return (
        <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
            <h2 className="text-xl font-bold mb-6">Teacher Panel</h2>

            <Link
                to="/teacherDash/classes"
                className={`block p-3 rounded hover:bg-gray-800 ${location.pathname === "/teacherDash/classes" ? "bg-gray-700" : ""}`}
            >
                Classes
            </Link>
            <Link
                to="/teacherDash/chat"
                className={`block p-3 rounded hover:bg-gray-800 ${location.pathname === "/teacherDash/chat" ? "bg-gray-700" : ""}`}
            >
                Chat
            </Link>
            <Link
                to="/teacherDash/attendance"
                className={`block p-3 rounded hover:bg-gray-800 ${location.pathname === "/teacherDash/attendance" ? "bg-gray-700" : ""}`}
            >
                Attendance
            </Link>
        </div>
    );
}

export default Sidebar;
