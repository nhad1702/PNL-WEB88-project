import { useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import API from "../../api/axiosConfig"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Profile from "../../components/Profile"

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
    <div className="w-full h-full flex">
      <Sidebar role={role} />
      <div className="w-full flex flex-row items-center p-5">
        <Profile />
      </div>
    </div>
  )
}

export default Home