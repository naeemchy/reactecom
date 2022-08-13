import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        document.title = "View Product";
        
        axios.get(`api/view-product`).then((res) => {
            if(res.data.status === 200) {
                //console.log(res.data.products);
                setProductList(res.data.products);
            }
            setLoading(false);
        }).catch((err) => {

        });
    }, []);

    var allProductList = '';
    
    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        let productStatus = " ";
        allProductList = productList.map((item, index) => {
            if(item.status === 0) {
                productStatus = 'Shown'
            } else {
                productStatus = 'Hidden'
            }
            return (
                <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} className="img-fluid img-thumbnail rounded" width="80px" alt={item.name} /></td>
                    <td>
                        <Link to={`/admin/edit-product/${item.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                    </td>
                    <td>
                        {productStatus}
                    </td>
                </tr>
            );
        });
    }

    return(
        <div className='container p-4'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Product list <Link to='/admin/add-product' className='btn btn-primary btn-sm float-end'>Add Product</Link></h4>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'></div>
                    <table className="table table-striped table-hover table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProductList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;