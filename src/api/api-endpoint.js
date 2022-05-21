const BASE_URL = "http://202.157.184.201:8000/"

const API_ENDPOINT = {
    LOGIN: `${BASE_URL}login`,
    DETAIL: (id) => `${BASE_URL}users/${id}`,
    REGISTER: `${BASE_URL}users`,
    VERIFICATION: `${BASE_URL}verifikasi`,
    OTP_RESEND: `${BASE_URL}otp`,
}

export default API_ENDPOINT