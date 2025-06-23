import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const TClassSidebar = () => {
  const location = useLocation();
  const { classCode } = useParams();

  const navItems = [
    { name: 'Info', path: 'info' },
    { name: 'Chat', path: 'chat' },
    { name: 'Attendance', path: 'attendance' },
    { name: 'Assignment', path: 'assignment' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#1c2c55] text-white p-6 font-['Nunito'] border-r border-[#1f2937] shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-sky-400 text-center">
        Class Panel 🎓
      </h2>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname.endsWith(item.path);
          return (
            <Link
              key={item.name}
              to={`/class/teacher/${classCode}/${item.path}`}
              className={`block px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md scale-[1.02]'
                  : 'hover:bg-[#1e293b] hover:text-sky-300 text-gray-200'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default TClassSidebar;
