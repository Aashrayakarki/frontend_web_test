import React, {useState} from "react";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Registerpage = () => {
    //Login Section

    //Make a useState for 5 fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')

    //Use State for Error Message
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    //Make one each function for changing the values
    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastname = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    //validation
    var validate = () => {
        var isValid = true;

        //validate the first name
        if(firstName.trim() == ''){
            setFirstNameError("First name is required")
            isValid = false;
        }

        if(lastName.trim() == ''){
            setLastNameError("Last name is required")
            isValid = false;
        }

        if (email.trim()==''){
            setEmailError("Email is required")
            isValid = false;
        }

        if (password.trim()==''){
            setPasswordError("Password is required")
            isValid = false;
        }

        if (confirmPassword.trim()==''){
            setConfirmPasswordError("Confirm Password is required")
            isValid = false;
        }

        if(confirmPassword.trim()!==password.trim()){
            setConfirmPasswordError("Password and Confirm Password doesn't match!!")
            isValid = false;
        }

        if (phone.trim()==''){
            setPhoneError("Phone number is required")
            isValid = false;
        }

        return isValid;
        
    }

    //Submit button Function
    const handleSubmit = (e) => {
        e.preventDefault()

        //validate
        var isValidated = validate();
        if(!isValidated){
            return
        }

        //Sending request to the api

        //Making Json object
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "phone": phone
        }


        registerUserApi(data).then((res)=>{
            //Received data: success, message
            if(res.data.success == false){
                toast.error(res.data.message)
            } else{
                toast.success(res.data.message)
            }
        })

        console.log(firstName, lastName, email, password, confirmPassword, phone)
    }

    return (
        <>
            <div className='container mt-2'>
                <h1>Create an account</h1>
                <form className='w-50'>
                    <label>Firstname: {firstName}</label>
                    <input onChange={handleFirstname} type="text" className='form-control' placeholder='Enter your first name'/>
                    {
                        firstNameError && <p className="text-danger">{firstNameError}</p>
                    }

                    <label className='mt-2'>Lastname: {lastName}</label>
                    <input onChange={handleLastname} type="text" className='form-control' placeholder='Enter your last name'/>
                    {
                        lastNameError && <p className="text-danger">{lastNameError}</p>
                    }

                    <label className='mt-2'>Email: {email}</label>
                    <input onChange={handleEmail} type="text" className='form-control' placeholder='Enter your email address'/>
                    {
                        emailError && <p className="text-danger">{emailError}</p>
                    }


                    <label className='mt-2'>Password: {password}</label>
                    <input onChange={handlePassword} type="text" className='form-control' placeholder='Enter your password'/>
                    {
                        passwordError && <p className="text-danger">{passwordError}</p>
                    }


                    <label className='mt-2'>ConfirmPassword: {confirmPassword}</label>
                    <input onChange={handleConfirmPassword} type="text" className='form-control' placeholder='Type your password again'/>
                    {
                        confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>
                    }

                    <label className='mt-2'>Phone Number: {phone}</label>
                    <input onChange={handlePhone} type="number" className='form-control' placeholder='Enter your phone number'/>
                    {
                        phoneError && <p className="text-danger">{phoneError}</p>
                    }


                    <button onClick={handleSubmit} className='btn btn-dark mt-3 w-100'>Create an Account</button>
                </form>
            </div>
        </>
    )
}

export default Registerpage;

//Step 1: Make Complete UI of Register Page (Fields, Button, etc)
//Step 2: Input (Type) - Make a state
//Step 3: OnChange - Set the value to the state


//Make a Login page
//Make a path in App.js
//Make a frontend with email and password
//Make an use state