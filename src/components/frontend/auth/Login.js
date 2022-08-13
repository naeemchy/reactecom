import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Login() {
    const history = useNavigate ();

    const [loginInput, setloginInput] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        setloginInput({
            ...loginInput, [e.target.name] : e.target.value
        });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email : loginInput.email,
            password : loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success!", `${res.data.message}`, "success");

                    if(res.data.role == 'admin') {
                        history("/admin/dashboard");
                    } else {
                        history("/");
                    }
                } else if(res.data.status === 401) {
                    swal("Warning!", `${res.data.message}`, "warning");
                } else {
                    setloginInput({...loginInput, error_list: res.data.validation_errors});
                }
            }).catch(err => {
                console.log(err);
            });
        });
    };

    return(
        <div>
            <Navbar />
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Login</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email ID</label>
                                        <input className='form-control' type="email" name='email' value={loginInput.email} onChange={handleInput} placeholder='Enter your email' />
                                        <span className='text-danger'>{loginInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input className='form-control' type="password" name='password' value={loginInput.password} onChange={handleInput}  placeholder='Enter your password' />
                                        <span className='text-danger'>{loginInput.error_list.password}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;