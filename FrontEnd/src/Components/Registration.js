import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Data } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';


const Registration = () => { 
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(Data);
  const userNameRef = useRef(null);
  const emailIdRef = useRef(null);
  const passwordRef = useRef(null);
  const namesref=useRef(null); 
  const [errorMessage, setErrorMessage] = useState('');



  const submit = async (e) => {
    e.preventDefault();
    const name=namesref.current.value;
    const email = emailIdRef.current.value;
    const username = userNameRef.current.value;
     const password = passwordRef.current.value;

    try{
      const payload={name,email,username,password};
      const response= await axios.post(
        "http://localhost:4000/api/users/register",payload);
        console.log(response,"rusk");
        
        if(response.status === 201){
          toast.success("Registration successful")
        
          navigate('/login');
        }   
      }catch(error){
          console.log(error);  
        }

    if (!username || !email || !password) {
      setErrorMessage('Please fill out the form');
      return;
    }

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (userData.find((user) => user.userName === username)) {
      setErrorMessage('Username already exists. Please choose a different one.');
      return;
    }

    setErrorMessage('');
    // const newUser = {name:names, userName: username, emailId: emailId, password: password, cart: [] };
    // setUserData([...userData, newUser]);  

    // navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className='rounded shadow p-3 mb-5 bg-white' style={{ width: '25rem' }}>
        <form>
          <h1 className='mt-3' style={{ fontFamily: 'inherit' }}>
            SIGN UP
          </h1>
          <input ref={namesref} className='form-control mt-3' type='text' placeholder='name' />
          <br />
          <input ref={userNameRef} className='form-control mt-3' type='text' placeholder='Username' />
          <br />
          <input ref={emailIdRef} className='form-control mt-4' type='email' placeholder='Email' /> 
          <br />
          <input ref={passwordRef} className='form-control mt-4' type='password' placeholder='Password' />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button className='btn btn-primary rounded mt-4 w-100' onClick={submit}>
            Sign up
          </button>
          <p className='mt-4'>
            Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
