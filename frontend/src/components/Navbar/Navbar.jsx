import React from 'react'
import logo from '../../assets/pngegg1.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/userSlice';

function Navbar() {

  const { user } = useSelector(state => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate('/login');
  }

  return (
    <div className='flex justify-between items-center border border-primary rounded-lg mt-7 p-3 bg-secondary text-white shadow'>
      <Link to='/' className='flex items-center'><img src={logo} alt="Logo" className='w-[50px]' /> <span className='w-[150px] text-center m-3'>My Social App</span></Link>

      {localStorage.hasOwnProperty('sm_user') ? ( 
          <div className='flex justify-between w-full items-center'>
            <div className='flex gap-3'>
              <NavLink to='/' className='bg-primary px-[25px] py-[7px] rounded-lg'>Home</NavLink>
              <NavLink to='/posts' className='bg-primary px-[25px] py-[7px] rounded-lg'>Posts</NavLink>
              <NavLink to='/ads' className='bg-primary px-[25px] py-[7px] rounded-lg'>Ads</NavLink>
            </div>
            <div className='flex gap-3'>
              <img src={user.image} alt="profileImg" className='w-[40px] object-cover cursor-pointer rounded-full'/>
              <button className='bg-primary p-[10px] rounded-lg' onClick={handleLogOut}>Log out</button>
            </div>
          </div> 
        ) : (
          <div className='flex gap-3'>
            <NavLink to='/' className='bg-primary px-[25px] py-[7px] rounded-lg'>Home</NavLink>
            <NavLink to='/register' className='bg-primary px-[25px] py-[7px] rounded-lg'>Register</NavLink>
            <NavLink to='/login' className='bg-primary px-[25px] py-[7px] rounded-lg'>Login</NavLink>
          </div>
        )
      }
    </div>
  )
}

export default Navbar;