import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'


import Profile from './Components/Profile'


import Student from './Components/Student'
import AddStudent from './Components/AddStudent'
import Homework from './Components/Homework'
import AddHomework from './Components/AddHomework'




function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Login />}></Route>
     
    
      <Route path='/dashboard' element={ <Dashboard />}>
        {/* <Route path='' element={<Home />}></Route> */}
        <Route path='/dashboard/student' element={<Student />}></Route>
       
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/homework' element={<Homework />}></Route>
        
        <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
        <Route path='/dashboard/add_homework' element={<AddHomework />}></Route>
        
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
