import React from 'react'
import logo from '../../assets/pngegg1.png';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='flex justify-between items-center border border-primary rounded-lg mt-7 p-3 bg-secondary text-white'>
      <Link to='/' className='flex items-center'><img src={logo} alt="Logo" className='w-[50px]' /> My Social App</Link>

      <div className='flex gap-3'>
        <NavLink to='/register' className='bg-primary px-[14px] py-[7px] rounded-lg'>Register</NavLink>
        <NavLink to='/login' className='bg-primary px-[14px] py-[7px] rounded-lg'>Login</NavLink>
      </div>
    </div>
  )
}

export default Navbar;