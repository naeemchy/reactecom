import React from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/admin/dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
                <Link className="nav-link" to="/admin/add-category">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Add Category
                </Link>
                <Link className="nav-link" to="/admin/view-category">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    View Category
                </Link>
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Products
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-product">Add Product</Link>
                        <Link className="nav-link" to="/admin/view-product">View Product</Link>
                    </nav>
                </div>
                {/* <Link className="nav-link" to="/admin/profile">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Profile
                </Link> */}
                <Link className="nav-link" to="/admin/orders">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Orders
                </Link>
            </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
        </div>
    </nav>
  )
}

export default Sidebar;