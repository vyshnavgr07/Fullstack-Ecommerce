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
        toast.error('Enter both email and password');
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
            const { token, user } = response.data.Data;
            localStorage.setItem('jwt', token);
            if (email !== adminEmail) {
                localStorage.setItem('userName', user.name);
                localStorage.setItem('userId', user._id);
                localStorage.setItem('email', user.email);
                setTimeout(() => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('email');
                }, 350000); // Adjust this time as needed
            }

            if (email === adminEmail) {
                navigate('/admin');
                toast.success('Admin Login Successful');
            } else {
                navigate('/');
                toast.success('Login Successful');
            }
        } else {
            toast.error('Unexpected response status');
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.message || 'Invalid username or password';
        toast.error(errorMessage);
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
