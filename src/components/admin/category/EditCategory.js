import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function EditCategory() {
    const history = useNavigate ();
    
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    const {id} = useParams();
    const category_id = id;

    useEffect(() => {
        axios.get(`/api/edit-category/${category_id}`).then((res) => {
            if(res.data.status === 200) {
                setCategory(res.data.category);
            } else if(res.data.status === 404) {
                swal("Error!", `${res.data.message}`, "error");
                history("/admin/view-category");
            }
            setLoading(false);
        })
    }, [category_id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name] : e.target.value});
    }

    const categoryUpdate = (e) => {
        e.preventDefault();

        const data = categoryInput;

        axios.put(`/api/update-category/${category_id}`, data).then((res) => {
            if(res.data.status === 200) {
                swal("Success!", `${res.data.message}`, "success");
                setError([]);
            } else if(res.data.status === 422) {
                setError(res.data.validation_errors);
            } else if(res.data.status === 404) {
                swal("Error!", `${res.data.message}`, "error");
                history("/admin/view-category");
            }
        });
    }

    var display_errors = [];
    if(error){
        display_errors = [
            error.slug,
            error.name,
            error.meta_title
        ];
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
                    <h4>Edit Category <Link to='/admin/view-category' className='btn btn-primary btn-sm float-end'>View Category</Link></h4>
                </div>
                <div className='card-body'>
                    {
                        display_errors.map( (item, index) => {
                            return(<p className='mb-1 text-danger text-center' key={index}>{item}</p>)
                        })
                    }
                    <form onSubmit={categoryUpdate}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tabs-tab" data-bs-toggle="tab" data-bs-target="#seo-tabs" type="button" role="tab" aria-controls="seo-tabs" aria-selected="false">Seo Tabs</button>
                            </li>
                        </ul>
                        <div className="tab-content mt-4" id="myTabContent">
                            <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className='mb-4 form-floating'>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" id="slug" placeholder="category slug name" />
                                    <label htmlFor="slug">Input category slug name</label>
                                </div>

                                <div className='mb-4 form-floating'>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" id="name" placeholder="category name" />
                                    <label htmlFor="name">Input category name</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea className="form-control" name='description' onChange={handleInput} value={categoryInput.description} placeholder="Leave a description here" id="description"></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="status">Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} id="status" /> 0-shown / 1-hidden
                                </div>
                            </div>
                            <div className="tab-pane fade card-body border" id="seo-tabs" role="tabpanel" aria-labelledby="seo-tabs-tab">
                                <div className='mb-4 form-floating'>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" id="meta_title" placeholder="Meta title" />
                                    <label htmlFor="meta_title">Meta Title</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea className="form-control" name='meta_keyword' onChange={handleInput} value={categoryInput.meta_keyword} placeholder="Leave meta keyword" id="meta_keyword"></textarea>
                                    <label htmlFor="meta_keyword">Meta Keywords</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea className="form-control" name='meta_descrip' onChange={handleInput} value={categoryInput.meta_descrip} placeholder="Leave meta description" id="meta_descrip"></textarea>
                                    <label htmlFor="meta_descrip">Meta Description</label>
                                </div>
                            </div>
                        </div>
                    <button type='submit' className='btn btn-primary px-4 mt-4 float-end'>Update</button>
                </form>                   
                </div>
            </div>
        </div>
    );
}

export default EditCategory;