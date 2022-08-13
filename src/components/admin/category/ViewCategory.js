import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        document.title = "View Category";

        axios.get(`api/view-category`).then((res) => {
            if(res.data.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        }).catch((err) => {

        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`/api/delete-category/${id}`).then((res) => {
            if(res.data.status === 200) {
                swal("Success!", `${res.data.message}`, "success");
                thisClicked.closest("tr").remove();
            } else if(res.data.status === 404) {
                swal("Error!", `${res.data.message}`, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var allCategoryList = '';
    
    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        allCategoryList = categoryList.map((item, index) => {
            return (
                <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`/admin/edit-category/${item.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={(e) => deleteCategory(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return(
        <div className='container p-4'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Category list <Link to='/admin/add-category' className='btn btn-primary btn-sm float-end'>Add Category</Link></h4>
                </div>
                <div className='card-body'>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Status</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCategoryList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;