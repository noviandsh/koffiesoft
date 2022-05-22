import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Verification from './Verification'

export default function Dashboard({ setDashboardVerified }) {
    const status = JSON.parse(localStorage.getItem('status'))
    const [verified, setVerified] = useState(!!status.kode)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const data = token ? jwtDecode(token) : null

    const navigate = useNavigate()

    const handleVerification = (status) => {
        setVerified(status)
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('status')
        setDashboardVerified(false)
        setToken(null)
        navigate('/')
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        setDashboardVerified(verified)
    }, [token, verified])

    return (
        <div className='d-flex justify-content-center h-100'>
            <button onClick={handleLogoutClick} className='btn btn-secondary position-absolute top-0 end-0 mt-3 me-3'>Logout</button>
            {
                verified ?
                    <div className='text-center'>
                        <h1>WELCOME</h1>
                        <h2>{data?.email}</h2>
                    </div>
                    :
                    <Verification email={data?.email} handleVerification={handleVerification} />
            }
        </div>
    )
}
