import React from 'react'

export default function Verification({ handleVerification }) {
    return (
        <div className='text-center'>
            <h1>Account Verification</h1>
            <p>Enter OTP that was sent to <strong>email@gmail.com</strong></p>
            <form>
                <div class="row g-3 align-items-center justify-content-center mb-4">
                    <div class="col-auto">
                        <input type="number" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
                    </div>
                </div>
                <div class="row g-3 align-items-center justify-content-center">
                    <div class="col-auto">
                        <button type="submit" id="inputPassword6" className='btn btn-primary' aria-describedby="passwordHelpInline">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
