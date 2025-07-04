import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPageTeacher from './pages/LoginPageTeacher.jsx'
import LoginPageStudent from './pages/LoginPageStudent.jsx'
import SignupPageStudent from './pages/SignupPageStudent.jsx'
import SignupPageTeacher from './pages/SignupPageTeacher.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import Navbar from './components/Navbar.jsx'

import { useSAuthStore } from './store/useSAuthStore.js'
import { useTAuthStore } from './store/useTAuthStore.js'
import SClassDetails from './pages/SClassDetails.jsx'
import TClassDetails from './pages/TClassDetails.jsx'

import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'


import SClassInfo from './s_class_components/Info.jsx'
import SClassChat from './s_class_components/Chat.jsx'
import SClassAttendance from './s_class_components/Attendance.jsx'
import SAssignmentList from './s_class_components/AssignmentList.jsx'

import TClassInfo from './t_class_components/Info.jsx'
import TClassChat from './t_class_components/Chat.jsx'
import TClassAttendance from './t_class_components/Attendance.jsx'
import TClassAssignmentUpload from './t_class_components/AssignmentUpload.jsx'

import './App.css'

const App = () => {
  const location = useLocation()

  const {
    authUser: studentUser,
    checkAuth: checkStudentAuth,
    isCheckingAuth: isCheckingStudentAuth
  } = useSAuthStore()

  const {
    authUser: teacherUser,
    checkAuth: checkTeacherAuth,
    isCheckingAuth: isCheckingTeacherAuth
  } = useTAuthStore()

  useEffect(() => {
    const path = location.pathname.toLowerCase()

    // Skip auth check on root (LandingPage)
    if (path === '/') return

    // Run student auth check only on student-related routes
    if (
      path.includes('/loginstudent') ||
      path.includes('/signupstudent') ||
      path.includes('/student')
    ) {
      checkStudentAuth()
    }

    // Run teacher auth check only on teacher-related routes
    if (
      path.includes('/loginteacher') ||
      path.includes('/signupteacher') ||
      path.includes('/teacher')
    ) {
      checkTeacherAuth()
    }
  }, [location.pathname])

  const path = location.pathname.toLowerCase()
  const isStudentRoute = path.includes('/student')
  const isTeacherRoute = path.includes('/teacher')
  const isChecking =
    (isStudentRoute && isCheckingStudentAuth) ||
    (isTeacherRoute && isCheckingTeacherAuth)

  if (isChecking && !studentUser && !teacherUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div className="bg-[#0b0f19] min-h-screen text-white font-['Nunito'] pt-16">
      <Navbar />

      <div className="px-4">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/LoginPageStudent' element={!studentUser ? <LoginPageStudent /> : <Navigate to='/studentDash' />} />
          <Route path='/SignupPageStudent' element={!studentUser ? <SignupPageStudent /> : <Navigate to='/studentDash' />} />
          <Route path='/studentDash' element={studentUser ? <StudentDashboard /> : <Navigate to='/LoginPageStudent' />} />
          <Route path='/LoginPageTeacher' element={!teacherUser ? <LoginPageTeacher /> : <Navigate to='/teacherDash' />} />
          <Route path='/SignupPageTeacher' element={!teacherUser ? <SignupPageTeacher /> : <Navigate to='/teacherDash' />} />
          <Route path='/teacherDash' element={teacherUser ? <TeacherDashboard /> : <Navigate to='/LoginPageTeacher' />} />
          <Route path='/class/student/:classCode' element={studentUser ? <SClassDetails /> : <Navigate to='/LoginPageStudent' />}>
            <Route index element={<Navigate to="info" />} />
            <Route path="info" element={<SClassInfo />} />
            <Route path="chat" element={<SClassChat />} />
            <Route path="attendance" element={<SClassAttendance />} />
            <Route path="assignment" element={<SAssignmentList />} />
          </Route>

          <Route path='/class/teacher/:classCode' element={teacherUser ? <TClassDetails /> : <Navigate to='/LoginPageTeacher' />}>
            <Route index element={<Navigate to="info" />} />
            <Route path="info" element={<TClassInfo />} />
            <Route path="chat" element={<TClassChat />} />
            <Route path="attendance" element={<TClassAttendance />} />
            <Route path="assignment" element={<TClassAssignmentUpload />} />
          </Route>        
          </Routes>
      </div>

      <Toaster />
    </div>

  )
}

export default App;