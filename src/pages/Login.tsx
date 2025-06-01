import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Box, Button } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import API from '../api/axiosConfig' // Make sure this is correct
import '../styles/Login.css'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // setError('')

        try {
            const res = await API.post('/users/login', { email, password })
            const { token, role } = res.data.user
            if (res.status === 200) {
                localStorage.setItem('token', token)
                localStorage.setItem('role', role)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                toast.success('Logged in successfully!')
                navigate('/home')
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Login failed'
            // setError(message)
            toast.error(message)
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Box component='form' className='w-full h-full flex items-center justify-center flex-col' onSubmit={handleLogin}>
                <div className='top flex items-center justify-center flex-col'>
                    <h1>Login</h1>
                    <div className='my-3'>
                        <TextField
                            label="Email"
                            variant="standard"
                            required
                            className='w-[20rem]'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-3'>
                        <TextField
                            label='Password'
                            variant='standard'
                            type='password'
                            required
                            className='w-[20rem]'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>} */}
                    <div className='my-3'>
                        <span>Forgot password? <Link to='/forgot-password'>Click here</Link></span>
                    </div>
                    <div className='my-3'>
                        <Button variant='contained' className='w-[20rem]' type='submit'>Login</Button>
                    </div>
                    <div className='my-3'>
                        <span>If you don't have an account? <Link to='/register'>Register here</Link></span>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Login
