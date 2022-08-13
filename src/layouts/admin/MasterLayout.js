import React from 'react'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { Outlet } from "react-router-dom";
const MasterLayout = ({ children }) => {
  return (
    <div className='sb-nav-fixed'>
        <Navbar />
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default MasterLayout;