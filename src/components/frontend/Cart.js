import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';

export default function Cart() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
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

    const handleDecrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                item.id === cart_id ? {...item, product_qty : item.product_qty - (item.product_qty > 1 ? 1 : 0)} : item
            )
        );
        cartQtyUpdate(cart_id, "dec");
    }

    const handleIncrement = (cart_id) => {
        setCart(cart => 
            cart.map((item) => 
                item.id === cart_id ? {...item, product_qty : item.product_qty + (item.product_qty < 10 ? 1 : 0)} : item
            )
        );
        cartQtyUpdate(cart_id, "inc");
    }

    function cartQtyUpdate(cart_id, scope) {
        axios.put(`/api/cart-qty-update/${cart_id}/${scope}`).then((res) => {
            if(res.data.status === 401) {
                swal("Error", `${res.data.message}`, "error");
            }
        });
    }

    function deleteCartItem(e, cart_id) {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-cart-item/${cart_id}`).then((res) => {
            if(res.data.status === 200) {
                thisClicked.innerText = "Deleted";
                thisClicked.closest('tr').remove();
                swal("Success", `${res.data.message}`, "success");
            } else if(res.data.status === 401) {
                swal("Error", `${res.data.message}`, "error");
            } else if(res.data.status === 404) {
                thisClicked.innerText = "Remove";
                swal("Error", `${res.data.message}`, "error");
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
                    <h6 className='text-center'>Home / Cart</h6>
                </div>
            </div>

            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {cart.length > 0 ? <div className='table-responsive'>
                                <table className="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(item => {
                                            let total_price = item.product.selling_price * item.product_qty;
                                            total_cart_price += item.product.selling_price * item.product_qty;
                                            return (
                                                <tr key={item.id}>
                                                    <td width="10%"><img src={`http://127.0.0.1:8000/${item.product.image}`} alt='img' width='50px' height='50px' /></td>
                                                    <td>{item.product.name}</td>
                                                    <td width="15%">{item.product.selling_price}</td>
                                                    <td width="15%">
                                                        <div className='input-group'>
                                                            <button type='button' className="input-group-text" onClick={() => handleDecrement(item.id)}>-</button>
                                                            <div className="form-control text-center">{item.product_qty}</div>
                                                            <button type='button' className="input-group-text" onClick={() => handleIncrement(item.id)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td width="15%">{total_price}</td>
                                                    <td width="10%"><button type='button' className='btn btn-danger btn-sm' onClick={(e) => deleteCartItem(e, item.id)}>Remove</button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div> : <div className='card card-body py-5 text-center shadow-lg'><h4>Your shopping cart is empty</h4></div>}
                        </div>
                        <div className='col-md-8'></div>
                        {
                            cart.length > 0 && 
                            <div className='col-md-4'>
                                <div className='card card-body mt-3'>
                                    <h4>Sub Total: <span className='float-end'>{total_cart_price}</span></h4>
                                    <h4>Grand Total: <span className='float-end'>{total_cart_price}</span></h4>
                                    <hr></hr>
                                    <Link to='/checkout' className='btn btn-primary'>Checkout</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
