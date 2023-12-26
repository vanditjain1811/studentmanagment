import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'





import Student from './Components/Student'
import AddStudent from './Components/AddStudent'
import Homework from './Components/Homework'
import AddHomework from './Components/AddHomework'
import HomeworkCalendar from './Components/HomeworkCalendar'
import EditHomework from './EditHomework'




function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Login />}></Route>
     
    
      <Route path='/dashboard' element={ <Dashboard />}>
        {/* <Route path='' element={<Home />}></Route> */}
        <Route path='/dashboard/student' element={<Student />}></Route>
       
        <Route path='/dashboard/homeworkcalendar' element={<HomeworkCalendar />}></Route>
        <Route path='/dashboard/homework/:selectedDate' element={<Homework />}></Route>
        <Route path='/dashboard/edit_homework/:homeworkId' element={<EditHomework />}></Route>
       
        
        <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
        <Route path='/dashboard/add_homework' element={<AddHomework />}></Route>
        
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
