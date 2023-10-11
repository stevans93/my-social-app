import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { FileParser } from '../../utils/FileParser';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

    const navigate = useNavigate();
    const VALID_TYPE = ['image/jpeg', 'image/jpg', 'image/png'];
    let KB = 1024;
    let MB = KB * 1024;

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            image: '',
            birthDate: ''
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required('Field is required...'),
            lastName: Yup.string().required('Field is required...'),
            email: Yup.string().required('Field is required...'),
            password: Yup.string().required('Field is required...'),
            gender: Yup.string().required('Field is required...'),
            birthDate: Yup.string().required('Field is required...'),
            image: Yup.mixed()
                .required('Field is required...')
                .test('fileSize', 'Wrong file size', (value) => value.size < MB * 2)
                .test('fileType', 'Wrong file type', (value) => VALID_TYPE.includes(value.type))
        }),

        onSubmit: (values) => {
            FileParser(values.image)
                .then((res) => {
                    UserService.registerUser({...values, image: res})
                        .then((user) => {
                            if(user.status === 200) {
                                toast.success('User registration successful...', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                    });
                                setTimeout(() => {
                                    navigate('/login');
                                }, 3000);
                            } else {
                                toast.warning('User already registered...', {
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
                            console.log(err);
                        })
                })
                .catch(err => console.log(err));

                formik.resetForm();
        }
    });

    const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='w-[70%] p-[20px] border border-primary rounded-lg mx-auto mt-7 flex flex-col bg-secondary'>
            <label className='text-[15px]'>First Name: {' '} <span className='text-red-600'>{showError('firstName')}</span> </label>
            <input value={formik.values.firstName} onChange={formik.handleChange} type="text" name='firstName' placeholder='Insert First Name...' className='bg-secondary border p-[7px]'/>

            <label className='text-[15px]'>Last Name: {' '} <span className='text-red-600'>{showError('lastName')}</span> </label>
            <input value={formik.values.lastName} onChange={formik.handleChange} type="text" name='lastName' placeholder='Insert Last Name...' className='bg-secondary border p-[7px]'/>

            <label className='text-[15px]'>Email: {' '} <span className='text-red-600'>{showError('email')}</span> </label>
            <input value={formik.values.email} onChange={formik.handleChange} type="email" name='email' placeholder='Insert Email...' className='bg-secondary border p-[7px]'/>

            <label className='text-[15px]'>Password: {' '} <span className='text-red-600'>{showError('password')}</span> </label>
            <input value={formik.values.password} onChange={formik.handleChange} type="password" name='password' placeholder='Insert Password...' className='bg-secondary border p-[7px]'/>

            <label className='text-[15px]'>Gender: {' '} <span className='text-red-600'>{showError('gender')}</span> </label>
            <select value={formik.values.gender} onChange={formik.handleChange} name='gender' className='bg-secondary border p-[7px] text-[#9CA3AF]'>
                <option value='gender' defaultChecked>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>

            <label className='text-[15px]'>Image: {' '} <span className='text-red-600'>{showError('image')}</span> </label>
            <input onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])} type="file" name='image' className='text-[#9CA3AF]'/>

            <label className='text-[15px]'>Birthdate: {' '} <span className='text-red-600'>{showError('birthDate')}</span> </label>
            <input value={formik.values.birthDate} onChange={formik.handleChange} type="date" name='birthDate' className='bg-secondary border p-[7px] text-[#9CA3AF]'/>

            <button type='submit' className='bg-primary p-[10px] mt-[20px] rounded-lg'>Register</button>
        </form>
    </div>
  )
}

export default Register;