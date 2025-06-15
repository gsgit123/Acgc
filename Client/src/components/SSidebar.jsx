import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const SClassSidebar = () => {
  const location = useLocation();
  const { classCode } = useParams();

  const navItems = [
    { name: 'Info', path: 'info' },
    { name: 'Chat', path: 'chat' },
    { name: 'Attendance', path: 'attendance' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#1f2937] text-[#f9fafb] p-6 font-['Nunito'] shadow-lg border-r border-[#374151]">
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-sky-400">Class Panel</h2>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname.endsWith(item.path);
          return (
            <Link
              key={item.name}
              to={`/class/student/${classCode}/${item.path}`}
              className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-[#2563eb] text-white shadow'
                  : 'hover:bg-[#374151] hover:text-sky-300'
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

export default SClassSidebar;
