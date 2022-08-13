import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';

export default function Order() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.title = "View Order";
        
        axios.get(`api/admin/show-user-orders`).then((res) => {
            if(res.data.status === 200) {
                setOrders(res.data.orders);
            }
            setLoading(false);
        }).catch((err) => {

        });
    }, []);

    var allOrderList = '';
    
    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        allOrderList = orders.map((item, index) => {
            return (
                <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`/admin/view-order/${item.id}`} className='btn btn-primary btn-sm'>View</Link>
                    </td>
                </tr>
            );
        });
    }

    return(
        <div className='container p-4'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Order list</h4>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'></div>
                    <table className="table table-striped table-hover table-bordered text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tracking No</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrderList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
