import React from 'react';
import { useSAuthStore } from '../store/useSAuthStore';
import { useTAuthStore } from '../store/useTAuthStore';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    const userName = studentAuthUser?.fullName || teacherAuthUser?.fullName || ""; 
 
    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <h1 className="text-lg font-bold" onClick={() => {
                            if(studentAuthUser){
                                navigate("/studentDash");
                            }else if(teacherAuthUser){
                                navigate("/teacherDash");
                            }else{
                                navigate("/");
                            }
                        }}>ACGC</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {userName && (
                            <div className="flex items-center gap-2">
                                <User className="size-5" />
                                <span className="font-medium">{userName}</span>
                            </div>
                        )}
                        {(studentAuthUser || teacherAuthUser) && (
                            <button className="flex gap-2 items-center" onClick={handleLogout}>
                                <LogOut className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;