import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function AdminPrivateRoute() {
    const history = useNavigate ();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkingAuthenticate`).then(res => {
            if(res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal("Unautherize!", `${err.response.data.message}`, "warning");
            history("/login");
        }

        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error){
        if(error.response.status === 403){
            swal("Forbidden!", `${error.response.data.message}`, "warning");
            history("/403");
        } else if(error.response.status === 404) {
            swal("404 Error", `Url/Page not found`, "warning");
            history("/404");
        }

        return Promise.reject(error);
    });

    if(loading) {
        return <h2>Loading....</h2>
    }

    return Authenticated ? <MasterLayout /> : <Navigate to="/login" />;
}
