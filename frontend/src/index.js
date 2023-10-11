import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppLayout from './AppLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Components and Pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/Login',
        element: <Login />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
