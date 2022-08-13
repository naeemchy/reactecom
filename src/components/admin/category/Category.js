import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Category() {
    const history = useNavigate();

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        descrip: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',
        error_list: []
    })

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name] : e.target.value});
    }

    const categorySubmit = (e) => {
        e.preventDefault();

        const data = {
            slug : categoryInput.slug,
            name : categoryInput.name,
            description : categoryInput.descrip,
            status : categoryInput.status,
            meta_title : categoryInput.meta_title,
            meta_keyword : categoryInput.meta_keyword,
            meta_descrip : categoryInput.meta_descrip
        }

        axios.post(`api/store-category`, data).then(res => {
            if(res.data.status === 200) {
                swal("Success!", `${res.data.message}`, "success");
                document.getElementById('category_form').reset();
                history("/admin/view-category");
            } else {
                setCategory({...categoryInput, error_list: res.data.validation_errors});
            }
        });
        
    }

    var display_errors = [];
    if(categoryInput.error_list){
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title
        ];
    }

    return(
        <div className='container-fluid px-4'>
            <h1 className='mt-4 text-center'>Add Category</h1>

            {
                display_errors.map( (item, index) => {
                    return(<p className='mb-1 text-danger text-center' key={index}>{item}</p>)
                })
            }

            <form onSubmit={categorySubmit} id="category_form">
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
                            <span className='text-danger'>{categoryInput.error_list.slug}</span>
                        </div>

                        <div className='mb-4 form-floating'>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" id="name" placeholder="category name" />
                            <label htmlFor="name">Input category name</label>
                            <span className='text-danger'>{categoryInput.error_list.name}</span>
                        </div>

                        <div className="form-floating mb-4">
                            <textarea className="form-control" name='descrip'onChange={handleInput} value={categoryInput.descrip} placeholder="Leave a description here" id="description"></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="status">Status</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} id="status" /> 1-shown / 0-hidden
                        </div>
                    </div>
                    <div className="tab-pane fade card-body border" id="seo-tabs" role="tabpanel" aria-labelledby="seo-tabs-tab">
                        <div className='mb-4 form-floating'>
                            <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" id="meta_title" placeholder="Meta title" />
                            <label htmlFor="meta_title">Meta Title</label>
                            <span className='text-danger'>{categoryInput.error_list.meta_title}</span>
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
                <button type='submit' className='btn btn-primary px-4 mt-4 float-end'>Submit</button>
            </form>
        </div>
    );
}

export default Category;