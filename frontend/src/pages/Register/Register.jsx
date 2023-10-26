import React, { useRef, useState } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { FileParser } from '../../utils/FileParser';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';

function Register() {

    const navigate = useNavigate();
    const ref = useRef();

    const [isVisible, setIsVisible] = useState(true);

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
                                    autoClose: 2000,
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
                                    autoClose: 2000,
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
                            toast.warning(err.response.data.msg, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                        })
                })
                .catch(err => console.log(err));

                formik.resetForm();
                ref.current.value = "";
        }
    });

    const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

    const handleVisibility = () => {
        setIsVisible(!isVisible);
    }

  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='w-[70%] p-[20px] border border-primary rounded-lg mx-auto mt-7 flex flex-col bg-secondary gap-2 shadow'>
            <label className='text-[15px]'>First Name: {' '} <span className='text-red-600 italic'>{showError('firstName')}</span> </label>
            <input value={formik.values.firstName} onChange={formik.handleChange} type="text" name='firstName' placeholder='Insert First Name...' className='bg-secondary border p-[7px] rounded-md'/>

            <label className='text-[15px]'>Last Name: {' '} <span className='text-red-600 italic'>{showError('lastName')}</span> </label>
            <input value={formik.values.lastName} onChange={formik.handleChange} type="text" name='lastName' placeholder='Insert Last Name...' className='bg-secondary border p-[7px] rounded-md'/>

            <label className='text-[15px]'>Email: {' '} <span className='text-red-600 italic'>{showError('email')}</span> </label>
            <input value={formik.values.email} onChange={formik.handleChange} type="email" name='email' placeholder='Insert Email...' className='bg-secondary border p-[7px] rounded-md'/>

            <div className='relative flex flex-col'>
                <label className='text-[15px]'>Password: {' '} <span className='text-red-600 italic'>{showError('password')}</span> </label>
                <input value={formik.values.password} onChange={formik.handleChange} type={`${isVisible ? 'password' : 'text'}`} name='password' placeholder='Insert Password...' className='bg-secondary border p-[7px] rounded-md'/>
                {isVisible ? (
                    <MdOutlineVisibility onClick={handleVisibility} className='absolute text-2xl top-8 right-3'/>
                ) : (
                    <MdOutlineVisibilityOff onClick={handleVisibility} className='absolute text-2xl top-8 right-3'/>
                )}
            </div>
           
            
            <label className='text-[15px]'>Gender: {' '} <span className='text-red-600 italic'>{showError('gender')}</span> </label>
            <select value={formik.values.gender} onChange={formik.handleChange} name='gender' className='bg-secondary border p-[7px] text-[#9CA3AF] rounded-md'>
                <option value='gender' defaultChecked>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>

            <label className='text-[15px]'>Image: {' '} <span className='text-red-600 italic'>{showError('image')}</span> </label>
            <input rer={ref} onChange={(e) => formik.setFieldValue(e.target.name, e.target.files[0])} type="file" name='image' className='text-[#9CA3AF]'/>

            <label className='text-[15px]'>Birthdate: {' '} <span className='text-red-600 italic'>{showError('birthDate')}</span> </label>
            <input value={formik.values.birthDate} onChange={formik.handleChange} type="date" name='birthDate' className='bg-secondary border p-[7px] text-[#9CA3AF] rounded-md'/>

            <button type='submit' className='bg-primary p-[10px] mt-[20px] rounded-lg cursor-pointer'>Register</button>
        </form>
    </div>
  )
}

export default Register;