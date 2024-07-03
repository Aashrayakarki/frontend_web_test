import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

const Login = () => {

    // Making a use sate
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Making an error state
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    // validation
    const validation = () => {
        let isValid = true;
        if (email.trim() === '' || email.includes('@') === false || email.includes('.') === false) {
            setEmailError('Email is invalid or empty');
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }
        return isValid;
    }



    // Making a function for submit button
    const handleSubmit = (e) => {
        e.preventDefault();

        var isValidated = validation();
        if (!isValidated) {
            return
        }


        const data = {
            "email": email,
            "password": password
        }

        loginUserApi(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)


                //  We have received Success - bool, message - text, token - text, user data -json object
                // Setting token in local storage

                localStorage.setItem('token', res.data.token);

                // Setting user data in local storage

                const convertedData = JSON.stringify(res.data.userData);
                localStorage.setItem('userData', convertedData);

            }
        })
    }

    return (
        <>
            <div className="container mt-2">
                <h1>Login Page</h1>
                <form className="w-50">

                    <label className="mt-2">email :{email}</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="enter your email" />
                    {emailError && <p className="text-danger">{emailError}</p>}

                    <label className="mt-2">Password :{password}</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" className="form-control" placeholder="enter your password" />
                    {passwordError && <p className="text-danger">{passwordError}</p>}

                    <button onClick={handleSubmit} className="btn btn-dark mt-3 w-100">Login</button>
                </form>

            </div>

        </>
    )
}

export default Login;