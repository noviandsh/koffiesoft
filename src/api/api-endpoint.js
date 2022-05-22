const BASE_URL = "http://202.157.184.201:8000/"

const API_ENDPOINT = {
    LOGIN: `${BASE_URL}login`,
    REGISTER: `${BASE_URL}users`,
    VERIFICATION: `${BASE_URL}users/verifikasi`,
    OTP_RESEND: `${BASE_URL}users/otp`,
}

export default API_ENDPOINT