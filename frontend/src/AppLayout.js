import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000/api';

function AppLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <ToastContainer />
      <Outlet />
      
    </div>
  );
}

export default AppLayout;
