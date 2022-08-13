import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Register() {
    const history = useNavigate ();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: []
    });

    const handleChange = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name] : e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name : registerInput.name,
            email : registerInput.email,
            password : registerInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success!", `${res.data.message}`, "success");
                    history("/login");
                } else {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return(
        <div>
            <Navbar />
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Register</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Full Name</label>
                                        <input className='form-control' type="text" name='name' placeholder='Enter your name' onChange={handleChange} value={registerInput.name} />
                                        <span className='text-danger'>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email ID</label>
                                        <input className='form-control' type="email" name='email' placeholder='Enter your email' onChange={handleChange} value={registerInput.email} />
                                        <span className='text-danger'>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input className='form-control' type="password" name='password' placeholder='Enter your password' onChange={handleChange} value={registerInput.password} />
                                        <span className='text-danger'>{registerInput.error_list.password}</span>
                                    </div>
                                    {/* <div className='form-group mb-3'>
                                        <label>Confirm Password</label>
                                        <input className='form-control' type="password" name='confirm_password' placeholder='Enter your confirm-password' value='' />
                                    </div> */}
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Register</button>
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

export default Register;