import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import API_ENDPOINT from '../api/api-endpoint'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [])

    const encodeForm = (data) => {
        let formBody = []
        for (let property in data) {
            let encodedKey = encodeURIComponent(property)
            let encodedValue = encodeURIComponent(data[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }
        return formBody.join('&')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(API_ENDPOINT.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeForm(form)
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.status.kode === "success") {
                    localStorage.setItem('token', resJson.access_token)
                    localStorage.setItem('status', JSON.stringify(resJson.data.account_status))
                    navigate('/dashboard')
                } else {
                    Swal.fire(
                        'Login failed',
                        resJson.status.keterangan,
                        'error',
                    );
                }

            })
            .catch(() => {
                if (!window.navigator.onLine) {
                    Swal.fire(
                        'Login failed',
                        'Make sure your internet is connected!',
                        'error',
                    );
                } else {
                    Swal.fire(
                        'Login failed',
                        '',
                        'error',
                    );
                }
            })
    }
    return (
        <div>
            <h1 className='mb-4'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-label="Email address" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary me-3 px-4">Login</button> Don't have an account? <Link to="/register">Register</Link>
            </form>
        </div>
    )
}
