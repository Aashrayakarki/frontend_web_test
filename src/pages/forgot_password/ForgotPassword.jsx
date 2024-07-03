import React, {useState} from 'react'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  //make a state
  const [phone, setPhone] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  //send otp function
  const handleSendOtp = (e) => {
    e.preventDefault()

    //make an api call
    forgotPasswordApi({phone}).then((res)=>{
      if(res.status === 200){
        toast.success(res.data.message)
        setIsSent(true)
      }
    }).catch((error)=>{
      if(error.response.status === 400 || 500){
        toast.error(error.response.data.message)
      }
    })
  }

  //verify otp and set password
  const handleVerifyOtp = (e) => {
    e.preventDefault()

    const data = {
      'phone': phone,
      'otp': otp,
      'newPassword': newPassword
    }

    //make an api call
    verifyOtpApi(data).then((res)=>{
      if(res.status === 200){
        toast.success(res.data.message)
      }
    }).catch((error)=>{
      if(error.response.status === 400 || 500){
        toast.error(error.response.data.message)
      }
    })
  }
  return (
    <>
      <div className='container mt-3'>
         <h3> Forgot Password</h3>

         <form className='w-25'>
            <span className='d-flex'>
                <h4>+977</h4>
                <input disabled={isSent} onChange={(e)=>setPhone(e.target.value)} type='number' className='form-control ms-2' placeholder='Enter valid phone number'></input>
            </span>
            <button disabled={isSent} onClick={handleSendOtp} className='btn btn-dark mt-2 w-100'>Send OTP</button>

            {
              isSent && <>
              <hr/>
              <p>OTP has been sent to {phone}✅</p>
              <input className="form-control" onChange={(e)=>setOtp(e.target.value)} placeholder='Enter valid OTP code'></input>
              <input className="form-control mt-2" onChange={(e)=>setNewPassword(e.target.value)} type='text' placeholder='Set new password'></input>

              <button onClick={handleVerifyOtp} className='btn btn-primary w-100 mt-2'>Verify OTP and Set Password</button>
              </>
            }
         </form>
      </div>
    </>
  )
}

export default ForgotPassword

//Logic for forgot password
//1. Make a UI Done
//2. Make a state
//3. Send OTP (Make API call)
//if send otp success:
//disable the input, button
//show the UI: (OTP input, Set Password input)
//Verify OTP and set password
//if not verified, dont change password
