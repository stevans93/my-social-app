import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import UserService from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loggedUser } from '../../store/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Field is required...'),
      password: Yup.string().required('Field is required...')
    }),

    onSubmit: (values) => {
      UserService.loginUser(values)
        .then((res) => {
          if(res.status === 200) {
            toast.success('User successfully logged in...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            localStorage.setItem('sm_token', res.data.token);
            dispatch(loggedUser(res.data.user));

            setTimeout(() => {
              navigate('/');
            }, 3000)
            
          } else {
            toast.warning('User not logged in...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });

      formik.resetForm();
    }
  });

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='w-[70%] p-[20px] border border-primary rounded-lg mx-auto mt-7 flex flex-col bg-secondary shadow gap-2'>
        <label>Email: {' '} <span className='text-red-600 italic'>{showError('email')}</span> </label>
        <input value={formik.values.email} onChange={formik.handleChange} type='email' name='email' placeholder='Insert Email...' className='bg-secondary border p-[7px] rounded-md'/>

        <label>Password: {' '} <span className='text-red-600 italic'>{showError('password')}</span> </label>
        <input value={formik.values.password} onChange={formik.handleChange} type='password' name='password' placeholder='Insert Password...' className='bg-secondary border p-[7px] rounded-md'/>

        <button type='submit' className='bg-primary p-[10px] mt-[20px] rounded-lg'>Login</button>
      </form>
    </div>
  )
}

export default Login;