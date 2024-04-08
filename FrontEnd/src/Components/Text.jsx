import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Axios } from '../App';

const Text = () => {
  const [LoginUser, setLoginUser] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

    if (email === '' || password === '') {
      toast.error('Enter both username and password');
      return;
    }

    let url = 'http://localhost:4000/api/users/userlogin';

    if (email === adminEmail) {
      url = 'http://localhost:4000/api/admin/login';
    }

    try {
      const payload = { email, password };
      const response = await Axios.post(url, payload);

      if (response.status === 200) {
        if (email !== adminEmail) {
          localStorage.setItem('jwt', response.data.Data.token);
          localStorage.setItem('userName', response.data.Data.user.name);
          localStorage.setItem('userId', response.data.Data.user._id);
          localStorage.setItem('email', response.data.Data.user.email);
        } else {
          localStorage.setItem('jwt', response.data.Data.token);
        }

        if (email === adminEmail) {
          navigate('/admin');
          toast.success('Login Success');
        } else {
          setTimeout(() => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
          }, 350000);
          navigate('/');
          toast.success('Login Successful');
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if(error.response && error.response.status === 403 ){
        navigate("/login")
      }else{
        console.error(error);
        toast.error('Invalid username or password');
      }
      
    }
  };

  return (
    <div className='bg-bgColor min-h-screen flex items-center justify-center p-6 h-screen'>
      <div className='w-full md:w-75 h-screen lg:h-auto 2xl:h-83vh py-8 lg:py-0 d-flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-50 h-screen p-4 md:p-10 2xl:p-20 flex flex-column justify-center'>
          <div className='w-full d-flex gap-2 items-center mb-6'>
            <span className='text-2xl text-primary'>ShoeShop</span>
          </div>
          <p className='text-primary-1 text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2 text-primary-2'>Welcome Back</span>
          <form className='py-4 py-md-8 d-flex flex-column gap-3' onSubmit={handleLogin}>
            <input
              name='email'
              placeholder='email@example.com'
              type='email'
              className='form-control'
            />
            <input
              name='password'
              placeholder='Password'
              type='password'
              className='form-control'
            />
            <Link to='/reset-password' className='text-sm text-end text-blue font-semibold'>
              Forget Password
            </Link>
            <button type='submit' className='btn btn-primary'>Login</button>
          </form>
          <p className='text-primary-2 text-sm text-center'>
            Don't have an account?{' '}
            <Link to='/' className='text-primary font-semibold'>Create Account</Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className='hidden lg:flex w-50 h-screen flex-column items-center justify-center bg-primary'>
          <div className='relative w-full h-full d-flex items-center justify-content-center'>
            <img
              src='https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg'
              alt='bgImage'
              className='w-75 h-75 rounded-circle object-cover'
            />
          </div>
          <div className='mt-4 text-center'>
            <p className='text-white text-base'>Connect with friends & share for fun</p>
            <span className='text-sm text-white'>Share memories with friends and the world.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
