import React, { useState } from 'react'
import { Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
// import PersonIcon from '@mui/icons-material/Person'
import FolderIcon from '@mui/icons-material/Folder';
import AllInboxIcon from '@mui/icons-material/AllInbox'
import TaskIcon from '@mui/icons-material/Task'
import PeopleIcon from '@mui/icons-material/People'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Sidebar.css'

interface SidebarProps {
    role: string
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }

    const handleSidebarToggle = () => {
        setToggle(prev => !prev)
    }

    return (
        <div className={`h-screen flex flex-col justify-between items-center p-5 border-4 rounded-3xl transition-all duration-300 ${toggle ? 'w-[6rem]' : 'w-[18rem]'}`}>
            {/* Top Section */}
            <div className="top flex flex-col items-center w-full">
                <div className='w-full flex justify-start'>
                    <Button onClick={handleSidebarToggle} sx={{ minHeight: '2rem', minWidth: '2rem', borderRadius: '50%' }}>
                        <MenuIcon sx={{ height: 30, width: 30 }} />
                    </Button>
                </div>
                {!toggle && (
                    <div className='w-full flex items-center justify-center my-[1.5rem]'>
                        <span className='font-bold text-4xl'>HORIZON</span>
                    </div>
                )}
            </div>

            {/* Mid Section */}
            <div className="mid flex flex-col my-3 items-center w-full">
                {[
                    { icon: <AllInboxIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: "Dashboard" },
                    { icon: <FolderIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: "Project" },
                    { icon: <TaskIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: "Task" },
                    { icon: <EmojiEventsIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: "Rank" },
                    { icon: <SettingsIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: "Settings" },
                    { icon: <PeopleIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />, label: 'Manage', adminOnly: true },
                ].filter(item => !item.adminOnly || role === 'admin')
                .map((item, idx) => (
                    <Button key={idx}
                        sx={{
                            width: '100%',
                            height: '3rem',
                            display: 'flex',
                            justifyContent: toggle ? 'center' : 'flex-start',
                            alignItems: 'center',
                            my: 1,
                            px: toggle ? 0 : 2,
                            borderRadius: '1.5rem',
                            textTransform: 'none'
                        }}>
                        {item.icon}
                        {!toggle && <span className='ml-4 text-2xl'>{item.label}</span>}
                    </Button>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="bottom flex justify-center w-full">
                <Button onClick={handleSignOut}
                    sx={{
                        width: '100%',
                        height: '3rem',
                        display: 'flex',
                        justifyContent: toggle ? 'center' : 'flex-start',
                        alignItems: 'center',
                        px: toggle ? 0 : 2,
                        borderRadius: '1.5rem',
                        textTransform: 'none'
                    }}>
                    <LogoutIcon sx={{ height: 50, width: 50, borderRadius: '50%' }} />
                    {!toggle && <span className='ml-4 text-2xl'>Log out</span>}
                </Button>
            </div>
        </div>
    )
}

export default Sidebar