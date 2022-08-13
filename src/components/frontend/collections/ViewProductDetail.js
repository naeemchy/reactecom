import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';

export default function ViewProductDetail() {
    const [loading, setLoading] = useState(true);
    const [productDetails, setProduct] = useState([]);
    const [qty, setQty] = useState(1)

    const history = useNavigate ();
    const {category} = useParams();
    const category_slug = category;
    const {product} = useParams();
    const product_slug = product;

    useEffect(() => {
        let isMounted = true;
        document.title = "Product by category Collections";

        if(isMounted) {
            axios.get(`api/view-product-detail/${category_slug}/${product_slug}`).then((res) => {
                if(res.data.status === 200) {
                    setProduct(res.data.product);
                } else if(res.data.status === 404) {
                    swal("Error!", `${res.data.message}`, "error");
                    history("/collections");
                }
                setLoading(false);
            }).catch((err) => {

            });
        }
        
        return () => {
            isMounted = false;
        }
    }, [category_slug, product_slug, history]);

    const handleDecrement = () => {
        if(qty > 1) {
            setQty(qty => qty - 1);
        }
    }

    const handleIncrement = () => {
        if(qty < 10) {
            setQty(qty => qty + 1);
        }
    }

    const addToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id : productDetails.id,
            product_qty : qty
        }

        axios.post(`/api/add-to-cart`, data).then((res) => {
            if(res.data.status === 201) {
                swal("Success!", `${res.data.message}`, "success");
            } else if(res.data.status === 409) {
                swal("Warning!", `${res.data.message}`, "warning");
            } else if(res.data.status === 401) {
                swal("Error!", `${res.data.message}`, "error");
            } else if(res.data.status === 404) {
                swal("Warning!", `${res.data.message}`, "warning");
            }
        });
    }

    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        var stockAvailable = '';
        if(productDetails.qty > 0) {
            stockAvailable = <div>
                <div>
                    <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>
                    <div className='row'>
                        <div className='col-md-3 mt-3'>
                            <div className="input-group mb-3">
                                <button type='button' onClick={handleDecrement} className="input-group-text">-</button>
                                <div className="form-control text-center">{qty}</div>
                                <button type='button' onClick={handleIncrement} className="input-group-text">+</button>
                            </div>
                        </div>
                        <div className='col-md-3 mt-3'>
                            <button type='button' className='btn btn-primary w-100' onClick={addToCart}>Add to cart</button>
                        </div>
                    </div>
                </div>
                <button type='button' className='btn btn-danger mt-2'>Add to Wishlist</button>
            </div> 
        } else {
            stockAvailable = <div>
                <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
            </div>
        }
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-center'>Collections / {productDetails.category.name} / {productDetails.name}</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 border-end'>
                            <img src={`http://127.0.0.1:8000/${productDetails.image}`} alt='img' className='w-100' />
                        </div>
                        <div className='col-md-8'>
                            <h4>Product Name <span className='float-end badge btn-sm btn-danger badge-pill'>{productDetails.brand}</span></h4>
                            <p>{productDetails.description}</p>
                            <h4 className='mb-1'>Tk: {productDetails.selling_price}<s className='ms-2'>Tk: {productDetails.original_price}</s></h4>
                            {stockAvailable}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
