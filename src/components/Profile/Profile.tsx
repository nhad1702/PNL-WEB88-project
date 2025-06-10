import { useState, useEffect } from 'react'
import { LinearProgress, Box, Typography } from '@mui/material'
import API from '../../api/axiosConfig'
import ProfileRadar from './ProfileRadar'

type User = {
  firstName: string
  lastName: string
  email: string
  gender: string
  DOB: string
  age: number
  position: string
  role: 'employee' | 'manager' | 'admin'
  stats: {
    organization_skill: number
    technical_skill: number
    idea_contribution: number
    communication_skill: number
    product_optimization: number
  }
}

const getRadarMaxandRank = (total: number) => {
  if (total < 500) return { max: 500, rank: 'E' }
  if (total < 1000) return { max: 1000, rank: 'D' }
  if (total < 2000) return { max: 2000, rank: 'C' }
  if (total < 5000) return { max: 5000, rank: 'B' }
  if (total < 8000) return { max: 8000, rank: 'A' }
  return { max: total + 1000, rank: 'S' }
}

const Profile = () => {

  const [user, setUser] = useState<User | null>(null)
  const [totalStats, setTotalStats] = useState(0)
  const [max, setMax] = useState(500)
  const [rank, setRank] = useState('E')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get<User>('/users/profile')
        const data = res.data

        const values = [
          data.stats.organization_skill,
          data.stats.technical_skill,
          data.stats.idea_contribution,
          data.stats.communication_skill,
          data.stats.product_optimization
        ] 

        const total = values.reduce((acc, val) => acc + val, 0)
        const { max, rank } = getRadarMaxandRank(total)

        setUser(data)
        setTotalStats(total)
        setMax(max)
        setRank(rank)
      } catch (error) {
        console.error('Error fetching profile: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <div>Loading profile...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="w-full p-6 mx-auto border rounded-xl shadow-md flex flex-row">
      <div className='w-1/2'>
        <h2 className="text-3xl font-bold mb-4">Profile</h2>

        <div className="space-y-2 text-lg">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.DOB).toLocaleDateString()}</p>
          <p><strong>Age:</strong> {user.age}</p>
          {/* <p><strong>Position:</strong> {user.position}</p> */}
          {/* <p><strong>Role:</strong> {user.role}</p> */}
          <p><strong>Current Rank:</strong> {rank}</p>
        </div>

        <div className="mt-6">
          <Typography gutterBottom>
            Skill Progress ({totalStats} / {max})
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={(totalStats / max) * 100}
              color={
                rank === 'S' ? 'success' :
                  rank === 'A' ? 'primary' :
                    rank === 'B' ? 'info' :
                      rank === 'C' ? 'warning' :
                        'error'
              }
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </div>
      </div>
      <div className='w-1/2'>
        <ProfileRadar />
      </div>
    </div>
  )
}

export default Profile