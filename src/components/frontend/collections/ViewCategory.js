import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

export default function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        let isMounted = true;
        document.title = "Category Collections";

        if(isMounted) {
            axios.get(`api/get-category-lists`).then((res) => {
                if(res.data.status === 200) {
                    setCategoryList(res.data.category);
                }
                setLoading(false);
            }).catch((err) => {
    
            });
        }
        
        return () => {
            isMounted = false;
        }
    }, []);

    if(loading) {
        return <div className="text-center container p-4">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    var allCategoryList = '';

    allCategoryList = categoryList.map((item) => {
        return (
            <div className='col-md-4 g-4' key={item.id}>
                <div className='card'>
                    <div className='card-body'>
                        <Link to={`/collections/${item.slug}`} className='nav-link'>
                            <h5 className='text-center'>{item.name}</h5>
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6 className='text-center'>Category Page</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {allCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}
