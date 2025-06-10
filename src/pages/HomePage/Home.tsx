import { useEffect } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import API from "../../api/axiosConfig"
import { toast } from "react-toastify"
import { useNavigate, Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"

const Home = () => {

  const navigate = useNavigate()

  const role = localStorage.getItem('role') || ''
  console.log(role)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get('/users/me')
        console.log('User info: ', res.data.user)
      } catch (error) {
        toast.error(`You haven't logged in yet!`)
        navigate('/')
      }
    }

    checkLogin()
  }, [navigate])

  return (
    <div className="w-full h-full flex items-center">
      <Sidebar role={role} />
      <div className="w-full h-full flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Add more routes as needed */}
          </Routes>
      </div>
    </div>
  )
}

export default Home