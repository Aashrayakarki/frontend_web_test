import axios from "axios";

//creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": 'multipart/form-data',
    }
})

//Make a config for token
const config = {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

//Test API
export const testAPI = () => Api.get('/test')

//Register API
export const registerUserApi = (data) => Api.post('/api/user/create', data)

//Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data)

//Create Product API
export const createProductApi = (data) => Api.post('/api/product/create', data);

//Get All Products API
export const getAllProducts = () => Api.get('/api/product/get_all_products', config)

//Get Single Product API
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)

//Delete product API
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config)

//Update product API
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config)

//Forgot Password API
export const forgotPasswordApi = (data) => Api.post('/api/user/forgot_password', data)

//Verify OTP
export const verifyOtpApi = (data) => Api.post('/api/user/verify_otp', data)

//http://localhost:5000/test