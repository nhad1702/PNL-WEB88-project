import { useState, useEffect } from 'react'
import { RadarChart } from '@mui/x-charts/RadarChart'
import API from '../../api/axiosConfig'

const getRadarMaxandRank = (total: number) => {
    if (total < 500) return { max: 500, rank: 'E' }
    if (total < 1000) return { max: 1000, rank: 'D' }
    if (total < 2000) return { max: 2000, rank: 'C' }
    if (total < 5000) return { max: 5000, rank: 'B' }
    if (total < 8000) return { max: 8000, rank: 'A' }
    return { max: total + 1000, rank: 'S' }
}

const ProfileRadar = () => {

    const [stats, setStats] = useState<number[]>([])
    const [max, setMax] = useState(500)
    const [rank, setRank] = useState('E')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/users/stats')
                const data = res.data

                const values = [
                    data.organization_skill,
                    data.technical_skill,
                    data.idea_contribution,
                    data.communication_skill,
                    data.product_optimization
                ]

                console.log(values)

                const total = values.reduce((acc, val) => acc + val, 0)
                const { max, rank } = getRadarMaxandRank(total)

                setStats(values)
                setMax(max)
                setRank(rank)
            } catch (error) {
                console.error('Failed to load stats: ', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) return <div>Loading chart...</div>

    return (
        <div>
            <RadarChart
                height={300}
                series={[{ label: 'Employee', data: stats }]}
                radar={{
                    max: max,
                    metrics: [
                        'organization skill',
                        'technical skill',
                        'idea contribution',
                        'communication skill',
                        'product optimization'
                    ]
                }}
            />
            {/* <p>Rank: {rank}</p> */}
        </div>
    )
}

export default ProfileRadar
