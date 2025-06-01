import { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import API from "../api/axiosConfig"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

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
    <div className="w-full h-full">
      <Sidebar />
    </div>
  )
}

export default Home