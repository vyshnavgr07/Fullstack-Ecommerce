import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Axios } from '../App';
import loginn  from "../Components/Assets/loginn.jpg"
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

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

    let url = 'https://fullstack-ecommerce-6tus.onrender.com/api/users/userlogin';

    if (email === adminEmail) {
      url = 'https://fullstack-ecommerce-6tus.onrender.com/api/admin/login';
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
  
    <MDBContainer className="my-5" >

      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg' alt="login form" className='rounded-start w-100 h-100'/>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">The shoerack</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <form onSubmit={handleLogin}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg"/>

                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
              </form>

              
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  
  );
}

export default Text;
