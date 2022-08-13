import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Outlet } from 'react-router-dom';

function Navbar() {
    const history = useNavigate ();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`api/logout`).then(res => {
            if(res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success!", `${res.data.message}`, "success");
                history("/login");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
        );
    } else {
        AuthButtons = (
            <li className="nav-item">
                <button type='button' onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" to="/register">Logout</button>
            </li>
        );
    }

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/collections">Collection</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            {AuthButtons}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;