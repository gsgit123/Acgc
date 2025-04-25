import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPageTeacher from './pages/LoginPageTeacher.jsx'
import LoginPageStudent from './pages/LoginPageStudent.jsx'
import './App.css'
const App = () => {
  return (
    <div>
   <Routes>
   <Route path='/' element={<LandingPage/>}/>
   <Route path='/LoginPageTeacher' element={<LoginPageTeacher/>}/>
   <Route path='/LoginPageStudent' element={<LoginPageStudent/>}/>
   </Routes>
    </div>
  )
}

export default App;