import { useState } from "react";
import Swal from "sweetalert2";
import API_ENDPOINT from "../api/api-endpoint";

export default function Verification({ email, handleVerification }) {
    const [otp, setOtp] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const data = {
            "credential": email,
            "otp": otp
        }
        await fetch(API_ENDPOINT.VERIFICATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.status.kode === "success") {
                    Swal.fire(
                        'Account verification success',
                        resJson.status.keterangan,
                        'success',
                    ).then(() => {
                        handleVerification(true)
                    })
                } else {
                    Swal.fire(
                        'Account verification failed',
                        resJson.status.keterangan,
                        'error',
                    )
                }
            })
            .catch(() => {
                if (!window.navigator.onLine) {
                    Swal.fire(
                        'Account verification failed',
                        'Make sure your internet is connected!',
                        'error',
                    );
                } else {
                    Swal.fire(
                        'Account verification failed',
                        '',
                        'error',
                    );
                }
            })
    }

    const handleResendOTP = async () => {
        const data = {
            "credential": email,
            "tujuan": "email",
            "zona_waktu": "Asia/Jakarta"
        }
        await fetch(API_ENDPOINT.OTP_RESEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.status.kode === "success") {
                    Swal.fire(
                        'Resend OTP success',
                        resJson.status.keterangan,
                        'success',
                    )
                } else {
                    Swal.fire(
                        'Resend OTP failed',
                        resJson.status.keterangan,
                        'error',
                    )
                }
            })
            .catch(() => {
                if (!window.navigator.onLine) {
                    Swal.fire(
                        'Resend OTP failed',
                        'Make sure your internet is connected!',
                        'error',
                    );
                } else {
                    Swal.fire(
                        'Resend OTP failed',
                        '',
                        'error',
                    );
                }
            })
    }
    return (
        <div className='text-center'>
            <h1 className='mb-4'>Account Verification</h1>
            <p>Enter OTP that was sent to <strong>{email}</strong></p>
            <form onSubmit={handleFormSubmit}>
                <div className="row g-3 mb-4 align-items-center justify-content-center">
                    <div className="col-auto">
                        <input type="number" name='otp' id="otp" className="form-control" aria-label="OTP" onChange={(e) => setOtp(e.target.value)} value={otp} />
                    </div>
                </div>
                <div className="row g-3 align-items-center justify-content-center">
                    <div className="col-auto">
                        <button type="submit" className='btn btn-primary px-4' aria-label="Submit">Submit</button>
                        <a onClick={handleResendOTP} className='btn btn-link' aria-label="Resend OTP">Resend OTP</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
