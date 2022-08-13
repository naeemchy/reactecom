import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';

export default function Checkout() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    })
    const [error, setError] = useState([]);

    const history = useNavigate ();
    let total_cart_price = 0;

    if(!localStorage.getItem('auth_token')) {
        swal("Warning!", "Login first", "warning");
        history("/");
    }

    useEffect(() => {
        let isMounted = true;
        document.title = "Cart Product";

        if(isMounted) {
            axios.get(`api/cart`).then((res) => {
                if(res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                } else if(res.data.status === 401) {
                    swal("Error!", `${res.data.message}`, "error");
                    history("/");
                }
            }).catch((err) => {
    
            });
        }
        
        return () => {
            isMounted = false;
        }
    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name] : e.target.value});
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            firstname : checkoutInput.firstname,
            lastname : checkoutInput.lastname,
            phone : checkoutInput.phone,
            email : checkoutInput.email,
            address : checkoutInput.address,
            city : checkoutInput.city,
            state : checkoutInput.state,
            zipcode : checkoutInput.zipcode
        }

        axios.post(`api/place-order`, data).then(res => {
            if(res.data.status === 200) {
                swal("Success!", `${res.data.message}`, "success");
                setError([]);
                history("/thank-you");
            } else if(res.data.status === 422){
                setError(res.data.validation_errors);
            }
        });
    }

    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-center'>Home / Checkout</h6>
                </div>
            </div>
            {
                cart.length > 0 ?
                    <div className='py-4'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h4>Basic Information</h4>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>First Name</label>
                                                        <input type="text" name='firstname' onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                                                        <small className='text-danger'>{error.firstname}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Last Name</label>
                                                        <input type="text" name='lastname' onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                                        <small className='text-danger'>{error.lastname}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Phone Number</label>
                                                        <input type="number" name='phone' onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                                        <small className='text-danger'>{error.phone}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='form-group mb-3'>
                                                        <label>Email Address</label>
                                                        <input type="text" name='email' onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                                        <small className='text-danger'>{error.email}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group mb-3'>
                                                        <label>Full Address</label>
                                                        <textarea rows='3' name='address' onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                                        <small className='text-danger'>{error.address}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>City</label>
                                                        <input type="text" name='city' onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                                        <small className='text-danger'>{error.city}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>State</label>
                                                        <input type="text" name='state'onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                                        <small className='text-danger'>{error.state}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-4'>
                                                    <div className='form-group mb-3'>
                                                        <label>Zip Code</label>
                                                        <input type="text" name='zipcode' onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                                        <small className='text-danger'>{error.zipcode}</small>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-group text-end'>
                                                        <button type='button' className='btn btn-primary' onClick={submitOrder}>Place Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <table className="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(item => {
                                                let total_price = item.product.selling_price * item.product_qty;
                                                total_cart_price += item.product.selling_price * item.product_qty;
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.product.selling_price}</td>
                                                        <td>{item.product_qty}</td>
                                                        <td>{total_price}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan='2' className='fw-bold'>Grand Total</td>
                                                <td colSpan='2' className='fw-bold'>{total_cart_price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div className='card card-body py-5 text-center shadow-lg'><h4>Your shopping cart is empty. Please add products to your cart first.</h4></div>
            }
        </div>
    )
}
