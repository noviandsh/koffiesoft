import React, { useState } from 'react'
import Verification from './Verification'

export default function Dashboard() {
    const [verified, setVerified] = useState(false)
    const handleVerification = (status) => {
        setVerified(status)
    }
    return (
        <div className='d-flex justify-content-center'>
            {
                verified ?
                    <>
                        <h1>WELCOME</h1>
                    </>
                    :
                    <Verification handleVerification={handleVerification} />
            }
        </div>
    )
}
