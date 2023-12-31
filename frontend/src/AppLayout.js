import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/userSlice";

if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000/api';
  console.log('development');
} else {
  axios.defaults.baseURL = 'https://my-social-app-lime.vercel.app/api';
  console.log('production');
}

axios.interceptors.request.use((config) => {
  if(localStorage.hasOwnProperty('sm_token')) {
    config.headers.authorization = localStorage.getItem('sm_token');
  }

  return config;
});

function AppLayout() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser(JSON.parse(localStorage.getItem('sm_user'))))
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default AppLayout;
