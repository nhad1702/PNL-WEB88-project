import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { TextField, Box, Button } from '@mui/material'

const Login = () => {
  return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <Box component='form' className='w-full h-full flex items-center justify-center flex-col'>
                <div className='top flex items-center justify-center flex-col'>
                    <h1>Login</h1>
                    <div className='my-3'>
                        <TextField id="standard-basic" label="Email" variant="standard" required className='w-[20rem]' />
                    </div>
                    <div className='my-3'>
                        <TextField id='standard-basic' label='Password' variant='standard' required type='password' className='w-[20rem]' />
                    </div>
                    <div className='my-3'>
                        <span>Forgot password? <Link to='/forgot-password'>Click here</Link></span>
                    </div>
                    <div className='my-3'>
                        <Button variant='contained' className='w-[20rem]'>Login</Button>
                    </div>
                </div>
            </Box>
        </div>
    </>
  )
}

export default Login