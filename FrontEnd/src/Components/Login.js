import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Axios } from '../App';

export default function Login() {
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

    let url = 'https://fullstack-ecommerce-6tus.onrender.com/userlogin';

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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="shadow p-4 mb-5 bg-white rounded m-3" style={{ maxWidth: '500px', width: '100%' }}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email address"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Link to="/forgot-password" className="text-primary">Forgot password</Link>
            </Col>
          </Row>

          <Button variant="success" type="submit" block>
            Login
          </Button>
        </Form>

        <Row>
          <Col className="mt-3">
            <h6>
              Don't have an account? <Link to="/register">Signup</Link>
            </h6>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
