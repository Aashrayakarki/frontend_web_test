import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { createProductApi, deleteProduct, getAllProducts } from '../../../apis/Api'
import { Link } from 'react-router-dom'


const AdminDashboard = () => {
    //1. State for all fetched products
    const [products, setProducts] = useState([])

    //2. Call API initially (Page load) - Set all fetch products to state (1)
    useEffect(() => {
        getAllProducts().then((res) => {
            //response: res.data.products
            setProducts(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log(products)

    //use State for input fields
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    //State for image
    const [productImage, setProductImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    //image upload handler
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductImage(file) //for backend
        setPreviewImage(URL.createObjectURL(file))
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        //make a form data (text, files)
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        formData.append('productImage', productImage)

        //make an API call
        createProductApi(formData).then((res) => {
            //for successful API
            if (res.status == 201) {
                toast.success(res.data.message)
            }

            //for error status code
        }).catch((error) => {
            //for error status code
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warning(error.response.data.message)
                } else if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error('Something went wrong')
                }
            } else {
                toast.error('Something went wrong')
            }
        })

    }

    //Handle delete product
    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to delete this product?')
        if (confirmDialog) {
            //calling api
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message)
                    window.location.reload()

                }
            }).catch((error) => {
                if (error.res.status === 500){
                    toast.error(error.res.data.message)
                }
            })
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between'>
                    <h3>Admin dashboard</h3>

                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add product
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form action=''>
                                        <label>Product Name</label>
                                        <input onChange={(e) => setProductName(e.target.value)} type="text" className='form-control' placeholder='Enter product name'></input>

                                        <label className='mt-2'>Product Price</label>
                                        <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control' placeholder='Enter product price'></input>

                                        <label className='mt-2'>Choose Category</label>
                                        <select onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                                            <option value="Plants">Plants</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Foods">Foods</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Clothes">Clothes</option>
                                            <option value="Footwear">Footwear</option>
                                        </select>

                                        <label className='mt-2'>Enter description</label>
                                        <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                                        <label className='mt-2'>Choose product Image</label>
                                        <input onChange={handleImage} type='file' className='form-control'></input>
                                        {/* Preview Image */}
                                        {
                                            previewImage && <img src={previewImage} alt='preview image' className='img-fluid rounded mt-2' />
                                        }
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table mt-2 ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Description</th>
                            <th scope="col">Product Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((singleProduct) => (
                                <tr>
                                    <td><img width={'40px'} height={'40px'} src={`http://localhost:5000/products/${singleProduct.productImage}`} alt='' /></td>
                                    <td>{singleProduct.productName}</td>
                                    <td>{singleProduct.productPrice}</td>
                                    <td>{singleProduct.productDescription}</td>
                                    <td>{singleProduct.productCategory}</td>
                                    <td>
                                        <Link to={`/admin/update/${singleProduct._id}`} className="btn btn-primary">Edit</Link>
                                        <button onClick={() => handleDelete(singleProduct._id)} className="btn btn-danger ms-1">Delete</button>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AdminDashboard

//Edit Product
//Admin Dashboard (Table) product1
//Make a route (Admin Edit product)
//Fill all the related info only
//Edit garna milnu paryo (Text, file)
//Make a backend to update the product
