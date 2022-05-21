import { Link, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import moment from "moment"

import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react"
import API_ENDPOINT from "../api/api-endpoint"
import Swal from "sweetalert2"

export default function Register() {
    const initialErrorMsg = {
        firstname: "",
        lastname: "",
        email: "",
        hp: "",
        tgl_lahir: "",
        jenis_kelamin: "",
        password: ""
    }
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        hp: "",
        tgl_lahir: "",
        jenis_kelamin: 0,
        password: "",
        grup: "member"
    })
    const [errorMsg, setErrorMsg] = useState(initialErrorMsg)
    const [date, setDate] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [])

    const handleInputChange = (e) => {
        if (e.target.name === "jenis_kelamin") {
            setForm({ ...form, jenis_kelamin: parseInt(e.target.value) })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const handleDatepickerChange = (date) => {
        const formatedDate = moment(date).format('YYYY-MM-DD')
        setForm({ ...form, tgl_lahir: formatedDate })
        setDate(date)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg(initialErrorMsg)

        let error = false

        if (form.jenis_kelamin === 0) {
            setErrorMsg({ ...errorMsg, jenis_kelamin: 'Please select your gender' })
            error = true
        }
        if (form.password.length < 8) {
            setErrorMsg({ ...errorMsg, password: 'Password must has at least 8 characters' })
            error = true
        }

        if (!error) {
            await fetch(API_ENDPOINT.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.status.kode === "success") {
                        Swal.fire(
                            'Registration success',
                            resJson.status.keterangan,
                            'success',
                        ).then(() => {
                            navigate('/', { state: { email: resJson.data.email } })
                        })
                    } else {
                        Swal.fire(
                            'Registration failed',
                            resJson.status.keterangan,
                            'error',
                        )
                    }
                })
                .catch(() => {
                    if (!window.navigator.onLine) {
                        Swal.fire(
                            'Registration failed',
                            'Make sure your internet is connected!',
                            'error',
                        );
                    } else {
                        Swal.fire(
                            'Registration failed',
                            '',
                            'error',
                        );
                    }
                })
        }
    }

    return (
        <div>
            <h2 className="mb-4">Register</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="first-name" className="form-label">First Name</label>
                        <input name="firstname" id="first-name" type="text" className="form-control form-control-sm" aria-label="First name" onChange={handleInputChange} value={form.firstname} required />
                        <span className="firstname valid-alert text-danger"><small>{errorMsg.firstname}</small></span>
                    </div>
                    <div className="col">
                        <label htmlFor="last-name" className="form-label">Last Name</label>
                        <input name="lastname" id="last-name" type="text" className="form-control form-control-sm" aria-label="Last name" onChange={handleInputChange} value={form.lastname} required />
                        <span className="lastname valid-alert text-danger"><small>{errorMsg.lastname}</small></span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="email" id="email" type="email" className="form-control form-control-sm" aria-label="Email address" onChange={handleInputChange} value={form.email} required />
                    <span className="email valid-alert text-danger"><small>{errorMsg.email}</small></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="hp" className="form-label">Phone Number</label>
                    <input name="hp" id="hp" type="number" className="form-control form-control-sm" aria-label="Phone number" onChange={handleInputChange} value={form.hp} required />
                    <span className="phone valid-alert text-danger"><small>{errorMsg.hp}</small></span>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select name="jenis_kelamin" id="gender" className="form-select form-select-sm" aria-label="Gender" onChange={handleInputChange} value={form.jenis_kelamin} required>
                            <option value="0" disabled>Select gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                        <span className="gender valid-alert text-danger"><small>{errorMsg.jenis_kelamin}</small></span>
                    </div>
                    <div className="col">
                        <label htmlFor="birth" className="form-label">Date of Birth</label>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            name="tgl_lahir"
                            id="birth"
                            className="form-control form-control-sm"
                            onChange={(date) => handleDatepickerChange(date)}
                            selected={date}
                            required
                        />
                        <span className="birth valid-alert text-danger"><small>{errorMsg.tgl_lahir}</small></span>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" id="password" type="password" className="form-control form-control-sm" aria-label="Password" onChange={handleInputChange} value={form.password} required />
                    <span className="password valid-alert text-danger"><small>{errorMsg.password}</small></span>
                </div>
                <button type="submit" className="btn btn-primary me-3 px-4">Register</button> Already have an account? <Link to="/">Log in</Link>
            </form>
        </div>
    )
}
