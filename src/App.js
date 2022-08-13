import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from './components/admin/Dashboard';
import Category from './components/admin/category/Category';
import ViewCategory from './components/admin/category/ViewCategory';
import EditCategory from './components/admin/category/EditCategory';
import AddProduct from './components/admin/product/AddProduct';
import ViewProduct from './components/admin/product/ViewProduct';
import EditProduct from './components/admin/product/EditProduct';
import Order from './components/admin/order/Order';
import Profile from './components/admin/Profile';
import AdminPrivateRoute from './routes/AdminPrivateRoute';
import PublicRoute from './routes/PublicRoute';

import Home from './components/frontend/Home';
import Contact from './components/frontend/Contact';
import About from './components/frontend/About';
import ViewCategoryCollection from './components/frontend/collections/ViewCategory';
import ViewProductCollection from './components/frontend/collections/ViewProduct';
import ViewProductDetail from './components/frontend/collections/ViewProductDetail';
import Cart from './components/frontend/Cart';
import Checkout from './components/frontend/Checkout';
import Thank from './components/frontend/Thank';

import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';

import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          
          <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register />} />

          <Route path='/' element={ <PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/collections" element={<ViewCategoryCollection />} />
            <Route path="/collections/:slug" element={<ViewProductCollection />} />
            <Route path="/collections/:category/:product" element={<ViewProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<Thank />} />
          </Route>

          <Route path='/admin' element={ <AdminPrivateRoute />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard"/>}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-category" element={<Category />} />
            <Route path="/admin/view-category" element={<ViewCategory />} />
            <Route path="/admin/edit-category/:id" element={<EditCategory />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/view-product" element={<ViewProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/orders" element={<Order />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
