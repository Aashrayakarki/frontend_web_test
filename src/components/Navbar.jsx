import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    //get user data from local storage
    const user = JSON.parse(localStorage.getItem('userData'))

    //logout function
    const handlelogout = () => {
        localStorage.clear()
        window.location.href = '/login'
    }

    return (
        <>
            <div className='container'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Hamro <span className='text-danger'>Minors</span></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                {
                                    user ? (<>
                                        <div class="dropdown">
                                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Welcome, test!
                                            </a>

                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                                <li><button onClick={handlelogout} class="dropdown-item" href="#">Log Out</button></li>
                                            </ul>
                                        </div>
                                    </>)
                                        : (<>
                                            <Link to={'/register'} className="btn btn-primary" type="Submit">Register</Link>
                                            <Link to={'/login'} className="btn btn-success ms-2" type="Submit">Login</Link></>)
                                }
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
