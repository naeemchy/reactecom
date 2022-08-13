import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const history = useNavigate();

    const [categoryList, setCategoryList] = useState([]);
    const [productInput, setProduct] = useState({
        category_id : '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: ''
    });

    const [picture, setPicture] = useState([]);
    const [checkbox, setCheckbox] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name] : e.target.value});
    }

    const handleImage = (e) => {
        setPicture({ image : e.target.files[0] });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckbox({...checkbox, [e.target.name] : e.target.checked});
    }

    const {id} = useParams();
    const product_id = id;

    useEffect(() => {
        axios.get('/api/all-category').then((res) => {
            if(res.data.status === 200) {
                setCategoryList(res.data.category);
            }
        });

        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if(res.data.status === 200) {
                setProduct(res.data.product);
                setCheckbox(res.data.product);
            } else if(res.data.status === 404) {
                swal("Error!", `${res.data.message}`, "error");
                history("/admin/view-product");
            }
            setLoading(false);
        })
    }, [product_id]);

    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('image', picture.image);

        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_descrip', productInput.meta_descrip);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', checkbox.featured ? '1' : '0');
        formData.append('popular', checkbox.popular ? '1' : '0');
        formData.append('status', checkbox.status ? '1' : '0');

        axios.post(`/api/update-product/${product_id}`, formData).then((res) => {
            if(res.data.status === 200) {
                swal("Success!", `${res.data.message}`, "success");
                setError([]);
            } else if(res.data.status === 422){
                setError(res.data.validation_errors);
            } else if(res.data.status === 404){
                swal("Error!", `${res.data.message}`, "error");
                history("/admin/view-product");
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

    return(
        <div className='container p-4'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Update Product <Link to='/admin/view-product' className='btn btn-primary btn-sm float-end'>View Product</Link></h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={updateProduct} id="product_form" encType='multipart/form-data'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tabs-tab" data-bs-toggle="tab" data-bs-target="#seo-tabs" type="button" role="tab" aria-controls="seo-tabs" aria-selected="false">Seo Tabs</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content mt-4" id="myTabContent">
                            <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className='mb-3 form-group'>
                                    <label htmlFor="category_id">Select Category</label>
                                    <select className="form-control" id="category_id" name='category_id' onChange={handleInput} value={productInput.category_id}>
                                        <option>Select Category</option>
                                        {
                                            categoryList.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='text-danger'>{error.category_id}</span>
                                </div>

                                <div className='mb-3 form-group'>
                                    <label htmlFor="slug">Slug</label>
                                    <input type='text' className='form-control' id='slug' name='slug' onChange={handleInput} value={productInput.slug} />
                                    <span className='text-danger'>{error.slug}</span>
                                </div>

                                <div className='mb-3 form-group'>
                                    <label htmlFor="name">Name</label>
                                    <input type='text' className='form-control' id='name' name='name' onChange={handleInput} value={productInput.name} />
                                    <span className='text-danger'>{error.name}</span>
                                </div>

                                <div className='mb-3 form-group'>
                                    <label htmlFor="description">Description</label>
                                    <textarea className='form-control' id='description' name='description' onChange={handleInput} value={productInput.description}></textarea>
                                </div>
                            </div>
                            <div className="tab-pane fade card-body border" id="seo-tabs" role="tabpanel" aria-labelledby="seo-tabs-tab">
                                <div className='mb-3 form-group'>
                                    <label htmlFor="meta_title">Meta Title</label>
                                    <input type="text" className="form-control" id="meta_title" name="meta_title" onChange={handleInput} value={productInput.meta_title} />
                                    <span className='text-danger'>{error.meta_title}</span>
                                </div>

                                <div className="mb-3 form-group">
                                    <label htmlFor="meta_keyword">Meta Keywords</label>
                                    <textarea className="form-control" id="meta_keyword" name='meta_keyword' onChange={handleInput} value={productInput.meta_keyword}></textarea>
                                </div>

                                <div className="mb-3 form-group">
                                    <label htmlFor="meta_descrip">Meta Description</label>
                                    <textarea className="form-control" id="meta_descrip" name='meta_descrip' onChange={handleInput} value={productInput.meta_descrip}></textarea>
                                </div>
                            </div>
                            <div className="tab-pane fade card-body border" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className='row'>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="selling_price">Selling Price</label>
                                        <input type="text" className="form-control" id="selling_price" name="selling_price" onChange={handleInput} value={productInput.selling_price} />
                                        <span className='text-danger'>{error.selling_price}</span>
                                    </div>

                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="original_price">Original Price</label>
                                        <input type="text" className="form-control" id="original_price" name="original_price" onChange={handleInput} value={productInput.original_price} />
                                        <span className='text-danger'>{error.original_price}</span>
                                    </div>

                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="qty">Quantity</label>
                                        <input type="text" className="form-control" id="qty" name="qty" onChange={handleInput} value={productInput.qty} />
                                        <span className='text-danger'>{error.qty}</span>
                                    </div>

                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="brand">Brand</label>
                                        <input type="text" className="form-control" id="brand" name="brand" onChange={handleInput} value={productInput.brand} />
                                        <span className='text-danger'>{error.brand}</span>
                                    </div>

                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="image">Update Image</label>
                                        <input type="file" className="form-control" id="image" name="image" onChange={handleImage} />
                                        <span className='text-danger'>{error.image}</span>
                                    </div>

                                    <div className="col-md-4 mb-3 form-group">
                                        <label htmlFor="image">Current Image</label>
                                        <img src={`http://127.0.0.1:8000/${productInput.image}`} className="ms-2 img-fluid img-thumbnail rounded" width="100px" alt={productInput.name} />
                                    </div>

                                    <div className="col-md-4">
                                        <input className="form-check-input pr-2" type="checkbox" id="featured" name="featured" onChange={handleCheckbox} defaultChecked={checkbox.featured === 1 ? true : false} />
                                        <label className="form-check-label" htmlFor="featured">Featured (checked-shown)</label>
                                    </div>

                                    <div className="col-md-4">
                                        <input className="form-check-input pr-2" type="checkbox" id="popular" name="popular" onChange={handleCheckbox} defaultChecked={checkbox.popular === 1 ? true : false} />
                                        <label className="form-check-label" htmlFor="popular">Popular (checked-shown)</label>
                                    </div>

                                    <div className="col-md-4">
                                        <input className="form-check-input pr-2" type="checkbox" id="status" name="status" onChange={handleCheckbox} defaultChecked={checkbox.status === 1 ? true : false} />
                                        <label className="form-check-label" htmlFor="status">Status (checked-hidden)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary px-4 mt-4 float-end'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;