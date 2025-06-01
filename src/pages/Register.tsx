import React, { useState } from 'react'
import { TextField, Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axiosConfig'
import { toast } from 'react-toastify'

interface Errors {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    confirmPassword?: string
    DOB?: string,
    gender?: string
}

const Register: React.FC = () => {
    const navigate = useNavigate()

    // Form state
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [DOB, setDOB] = useState('')
    const [gender, setGender] = useState('')

    // Error state
    const [errors, setErrors] = useState<Errors>({})
    // const [serverError, setServerError] = useState('')

    const validate = (): boolean => {
        const newErrors: Errors = {}

        if (!firstName.trim()) newErrors.firstName = 'First name is required'
        if (!lastName.trim()) newErrors.lastName = 'Last name is required'

        if (!email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)
        ) {
            newErrors.password =
                'Password must be at least 8 characters including uppercase, lowercase, number, and special character'
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!DOB) {
            newErrors.DOB = 'Date of Birth is required'
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(DOB)) {
            // expecting YYYY-MM-DD from <input type="date" />
            newErrors.DOB = 'Date of Birth must be in YYYY-MM-DD format'
        }

        if (!gender) {
            newErrors.gender = 'Please choose your gender'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        // setServerError('')

        if (!validate()) return

        try {
            const userData = { firstName, lastName, email, password, confirmPassword, DOB, gender }
            console.log(userData)
            const response = await API.post('/users/register', userData)

            if (response.status === 201) {
                toast.success('Registered successfully!')
                navigate('/')
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Unknown error'
            // setServerError(message)
            toast.error(message)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Box
                component="form"
                className="w-full h-full flex items-center justify-center flex-col"
                onSubmit={handleRegister}
            >
                <h1>Register</h1>

                <div className="my-3">
                    <TextField
                        label="First Name"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        className="w-[9.5rem]"
                        sx={{ marginRight: 1 }}
                    />
                    <TextField
                        label="Last Name"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        className="w-[9.5rem]"
                        sx={{ marginLeft: 1 }}
                    />
                </div>

                <div className="my-3">
                    <TextField
                        label="Date of Birth"
                        type="date"
                        variant="standard"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                        error={!!errors.DOB}
                        helperText={errors.DOB}
                        className="w-[9.5rem]"
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 1 }}
                    />
                    <FormControl 
                        variant='standard' 
                        className='w-[9.5rem]' 
                        sx={{ marginLeft: 1 }} 
                        required
                    >
                        <InputLabel id='gender-label'>Gender</InputLabel>
                        <Select
                            labelId='gender-label'
                            id='gender-select'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label='gender'
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="my-3">
                    <TextField
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        className="w-[20rem]"
                    />
                </div>

                <div className="my-3">
                    <TextField
                        label="Password"
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        className="w-[20rem]"
                    />
                </div>

                <div className="my-3">
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        className="w-[20rem]"
                    />
                </div>

                {/* {serverError && (
                    <div style={{ color: 'red', marginBottom: '1rem' }}>{serverError}</div>
                )} */}

                <Button type="submit" variant="contained" className="w-[20rem]">
                    Register
                </Button>

                <div className="my-3">
                    <span>
                        Have an account? <Link to="/">Login here</Link>
                    </span>
                </div>
            </Box>
        </div>
    )
}

export default Register
