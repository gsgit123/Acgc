import React from 'react';
import { useSAuthStore } from '../store/useSAuthStore';
import { useTAuthStore } from '../store/useTAuthStore';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout: studentLogout, authUser: studentAuthUser } = useSAuthStore();
  const { logout: teacherLogout, authUser: teacherAuthUser } = useTAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (studentAuthUser) {
      await studentLogout();
      navigate('/LoginPageStudent');
    } else if (teacherAuthUser) {
      await teacherLogout();
      navigate('/LoginPageTeacher');
    }
  };

  const userName = studentAuthUser?.fullName || teacherAuthUser?.fullName || '';
  const userInitials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); 

  return (
    <header className="bg-[#0f172a]/80 border-b border-[#1f2937] backdrop-blur-md shadow-lg fixed w-full top-0 z-50 font-['Nunito'] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
        <h1
  onClick={() => {
    if (studentAuthUser) {
      navigate('/studentDash');
    } else if (teacherAuthUser) {
      navigate('/teacherDash');
    } else {
      navigate('/');
    }
  }}
  className="text-3xl sm:text-4xl font-extrabold tracking-normal bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
>
  ACGC
</h1>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <div className="flex items-center gap-3 text-sm sm:text-base">
              <div className="flex items-center justify-center bg-sky-600 text-white rounded-full w-8 h-8 font-semibold shadow-md">
                {userInitials}
              </div>
              <span className="hidden sm:inline-block font-medium text-gray-200">{userName}</span>
            </div>
          )}

          {(studentAuthUser || teacherAuthUser) && (
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center text-sm sm:text-base font-medium hover:text-sky-400 transition-colors duration-200"
            >
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;