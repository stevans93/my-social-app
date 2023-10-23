import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppLayout from './AppLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Components and Pages
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Ads from './pages/Ads/Ads';
import AuthGuardianLogOut from './utils/AuthGuardianLogOut';
import AuthGuardianLogIn from './utils/AuthGuardianLogIn';

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
        element: <AuthGuardianLogIn> <Register /> </AuthGuardianLogIn> 
      },
      {
        path: '/login',
        element: <AuthGuardianLogIn> <Login /> </AuthGuardianLogIn> 
      },
      {
        path: '/posts',
        element: <AuthGuardianLogOut> <Posts /> </AuthGuardianLogOut>
      },
      {
        path: '/ads',
        element: <AuthGuardianLogOut> <Ads /> </AuthGuardianLogOut>
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
