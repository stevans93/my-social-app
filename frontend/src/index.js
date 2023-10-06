import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppLayout from './AppLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Components and Pages
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/',
        element: <Home />
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
