import { Box, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import API from '../../api/axiosConfig'
import './Forgot.css'

const Forgot = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting email:", email)
        try {
            const res = await API.post('/users/forgot-password', { email })
            setMessage(res.data.message)
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Something went wrong')
        }
    }

  return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <Box component='form' onSubmit={handleSubmit} className='w-full h-full flex items-center justify-center flex-col'>
                <h1>Forgot password</h1>
                <div className='my-3'>
                    <TextField id='standard-basic' label='Email' variant='standard' required className='w-[20rem]' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='my-3'>
                    <span>Remember the password? <Link to='/'>Login here</Link></span>
                </div>
                <div className='my-3'>
                    <Button type='submit' variant='contained' className='w-[20rem]'>Send</Button>
                </div>
                { message && <p className='text-sm mt-2'>{message}</p> }
            </Box>
        </div>
    </>
  )
}

export default Forgot