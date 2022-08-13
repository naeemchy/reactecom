import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import MasterLayout from './layouts/admin/MasterLayout'
// import Dashboard from './components/admin/Dashboard';
// import Profile from './components/admin/Profile';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/admin" name="Admin" render={(props)=> <MasterLayout {...props} />} />
            {/* <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/profile" element={<Profile />} /> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;


/////////////////////////////////////











import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import routes from '../../routes/routes';

const MasterLayout = () => {
  return (
    <div className='sb-nav-fixed'>
        <Navbar />
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Routes>
                        {routes.map((route,index) => {
                            route.element && (
                                <Route key={index} path={route.path} name={route.name} render={(props) => (
                                    <route.element {...props} />
                                )} />
                            )
                        })}
                        <Navigate from="admin" to="/admin/dashboard" />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default MasterLayout;