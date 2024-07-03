//importing
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Loginpage';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';

//import browser router
// import { BrowserRouter } from 'react-router-dom';

//Mocking the API js (No sending request to real backend)
jest.mock('../../apis/Api');

//Making test case
describe('Login Component Test', () => {
    //Clear all the mock data
    afterEach(() => {
        jest.clearAllMocks();
    });

    //defining test1
    it('should show error message on failed login', async () => {
        //rendering login component
        render(<Login />) //Built Screen

        //render(
        //    <BrowserRouter>
        //        <Login/>
        //    </BrowserRouter>
        //)

        //Mocking login fail response
        const mockResponse = {
            data: {
                success: false,
                message: "Password not matched!"
            }
        }

        //Config mock resolved value
        loginUserApi.mockResolvedValue(mockResponse);

        //Config that toast error message as a test function
        toast.error = jest.fn();

        //Testing real UI component
        //1. Finding email, password and Login button
        const email = await screen.getByPlaceholderText("enter your email")
        const password = await screen.getByPlaceholderText("enter your password")
        const loginBtn = screen.getByText("Login")

        //2. Simulating the email, password and login
        fireEvent.change(email, { target: { value: "test@gmail.com" } })
        fireEvent.change(password, { target: { value: "test123" } })
        fireEvent.click(loginBtn)

        //We have done all setup above
        waitFor(
            () => {
                expect(loginUserApi).toHaveBeenCalledWith({
                    email: "test@gmail.com",
                    password: "test123"
                })
                //Toast error
                expect(toast.error).toHaveBeenCalledWith("Password not matched!")

            });
    })

});