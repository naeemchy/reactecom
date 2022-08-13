import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    const history = useNavigate ();

    useEffect(() => {
        let isMounted = true;
        document.title = "Product Collections";

        if(isMounted) {
            axios.get(`api/fetch-product-lists`).then((res) => {
                if(res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                } else if(res.data.status === 400) {
                    swal("Error!", `${res.data.message}`, "error");
                    history("/");
                }
                setLoading(false);
            }).catch((err) => {

            });
        }
        
        return () => {
            isMounted = false;
        }
    }, [history]);

    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    var allProductList = '';

    allProductList = product.map((item) => {
        return (
            <div className='col-md-4 col-lg-3 g-4' key={item.id}>
                <div className="card">
                    <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                        <img src={`http://127.0.0.1:8000/${item.image}`} className="w-100 d-inline-block card-img-top" alt={item.name} />
                    </Link>
                    <div className="card-body text-center">
                        <Link to={`/collections/${item.category.slug}/${item.slug}`} className='text-decoration-none'><h5 className="card-title">{item.name}</h5></Link>
                        <div className='d-flex justify-content-center'>
                            <span className = "fw-bold text-decoration-line-through me-1">{item.original_price}</span>
                            <span className = "fw-bold text-danger ms-1">{item.selling_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-center'>Home</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {product.length ? allProductList : <h4 className='fw-blod text-center'>No products are available</h4>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;