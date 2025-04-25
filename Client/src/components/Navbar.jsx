import React from 'react'
import { useSAuthStore } from '../store/useSAuthStore';
import { MessageSquare, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logout, authUser } = useSAuthStore();

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">

                        <h1 className="text-lg font-bold">ACGC</h1>

                    </div>

                    <div className='flex items-center gap-4'>
                        {authUser && (
                            <>
                                <button className="flex gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar