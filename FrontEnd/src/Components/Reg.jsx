import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { Data } from '../App';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
const Reg = () => {
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
    <div>
         <MDBContainer fluid>

<div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

<MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>

    <h2 className="fw-bold mb-5">Sign up now</h2>

    <MDBRow>
      <MDBCol col='6'>
        <MDBInput ref={namesref} wrapperClass='mb-4' label='First name' id='form1' type='text'/>
      </MDBCol>

      <MDBCol col='6'>
        <MDBInput  ref={userNameRef} wrapperClass='mb-4' label='username' id='form1' type='text'/>
      </MDBCol>
    </MDBRow>

    <MDBInput ref={emailIdRef}  wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    <MDBInput   ref={passwordRef} wrapperClass='mb-4' label='Password' id='form1' type='password'/>

    <MDBBtn className='w-100 mb-4' size='md'  onClick={submit}>sign up</MDBBtn>


  </MDBCardBody>
</MDBCard>

</MDBContainer>
    </div>
  )
}

export default Reg