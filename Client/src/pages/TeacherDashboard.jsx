import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import TeacherClassPage from './TeacherClass'
import Chat from './TeacherChatPage'
import Attendance from './TeacherAttPage'

const TeacherDashboard = () => {
  return (
    <div className='flex pt-16 h-screen'>
      <Sidebar/>

      <div className="flex-1 overflow-y-auto p-6 bg-red-400">
        <Routes>
          <Route path="/" element={<Navigate to="classes" />} />
          <Route path="classes" element={<TeacherClassPage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="attendance" element={<Attendance />} />
        </Routes>
      </div>

    </div>
  )
}

export default TeacherDashboard