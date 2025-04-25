import React, { useEffect } from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPageTeacher from './pages/LoginPageTeacher.jsx'
import LoginPageStudent from './pages/LoginPageStudent.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import { useSAuthStore } from './store/useSAuthStore.js'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './components/Navbar.jsx'
import SignupPageStudent from './pages/SignupPageStudent.jsx'
const App = () => {

  const {authUser,checkAuth,isCheckingAuth}=useSAuthStore();

  useEffect(()=>{
    checkAuth()
  },[])

  console.log({authUser});

  if(isCheckingAuth&&!authUser)return(
    <div className='flex items-center justify-center h-screen'>
    <Loader className='size-10 animate-spin'/>
  </div>

  )
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/LoginPageTeacher' element={<LoginPageTeacher />} />
        <Route path='/LoginPageStudent' element={!authUser?<LoginPageStudent />:<Navigate to="/studentDash"/>} />
        <Route path='/SignupPageStudent' element={!authUser?<SignupPageStudent />:<Navigate to="/studentDash"/>} />
        <Route path='/SignupPageTeacher' element={<LoginPageStudent />} />
        <Route path='/teacherDash' element={<TeacherDashboard />} />
        <Route path='/studentDash' element={authUser?<StudentDashboard />:<Navigate to="/LoginPageStudent"/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App;