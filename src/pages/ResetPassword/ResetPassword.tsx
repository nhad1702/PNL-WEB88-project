import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'
import './Resetpassword.css'
import API from '../../api/axiosConfig'

const ResetPassword = () => {

  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPasword] = useState('')
  const [message, setMessage] = useState('')

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await API.post(`/users/reset-password/${token}`, { password })
      setMessage(res.data.message)
      setTimeout(() => navigate('/'), 3000)
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <>
      <div>
        <h1>Reset password</h1>
        <Box component='form' onSubmit={handleResetPassword}>
          <TextField
            label='Password'
            variant='standard'
            type='password'
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <Button type='submit'>Confirm new password</Button>
          {message && <p>{message}</p>}
        </Box>
      </div>
    </>
  )
}

export default ResetPassword