import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Forgot from './pages/Forgot/Forgot'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Home from './pages/HomePage/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
