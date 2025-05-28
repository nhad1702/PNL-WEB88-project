import { Box, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Forgot = () => {
  return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <Box component='form' className='w-full h-full flex items-center justify-center flex-col'>
                <h1>Forgot password</h1>
                <div className='my-3'>
                    <TextField id='standard-basic' label='Email' variant='standard' required className='w-[20rem]' />
                </div>
                <div className='my-3'>
                    <span>Remember the password? <Link to='/'>Login here</Link></span>
                </div>
                <div className='my-3'>
                    <Button variant='contained' className='w-[20rem]'>Send</Button>
                </div>
            </Box>
        </div>
    </>
  )
}

export default Forgot