import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form);
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
                <button type="submit" className="btn btn-primary me-3">Login</button> <Link to="/register">Register</Link>
            </form>
        </div>
    )
}
