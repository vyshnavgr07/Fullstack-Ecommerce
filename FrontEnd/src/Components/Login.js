import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login() {
  const [LoginUser, setLoginUser] = useState([]);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL; 
    console.log(adminEmail, 'adminnnnn');

    

    if (email === '' || password === '') { 
      toast.error('Enter both username and password');
      return;
    }

    let url = 'http://localhost:4000/api/users/userlogin'; 
  

    
    if (email === adminEmail) {
      url = 'http://localhost:4000/api/admin/login';
      
    }

    try {
      const payload = { email:email, password };
      const response = await axios.post(url, payload);
      console.log(response,"resss") 
      if(response.status === 200){
email !== adminEmail && localStorage.setItem("userId",response.data.Data.id)
email === adminEmail && localStorage.setItem("role","Admin")
localStorage.setItem("jwt",response.data.Data.Token)
localStorage.setItem("userName",response.data.Data.Username)


if(email === adminEmail){
  navigate('/admin');
  toast.success("Login Success")
}else{
  setTimeout(()=>{
    localStorage.removeItem("jwt")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
  },350000)
  navigate("/")
  toast.success("Login Successful");
}

}else{
  toast.error(response.message)
}
} catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    }

  };






    //   if (response.status === 200) {
    //     const { status, message, token,user} = response.data;
    //     console.log(response,"sfdfefef");

    //     localStorage.setItem('jwt', response.data.token);
    //       localStorage.setItem('userName', username);
    //       // localStorage.setItem('userId');

    //       if (username === adminUserName) {
    //         navigate('/admin');
    //       } else {
    //         navigate('/');
    //       }

    //       toast.success(message || 'Login successful');
    //     } else {
    //       toast.error(message || 'Login failed');
    //     }
     
    // } catch (error) {
    //   console.error(error);
    //   toast.error('An unexpected error occurred');
    // }


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="shadow p-3 mb-5 bg-white rounded m-3" style={{ width: '25rem' }}>
        <form onSubmit={handlelogin}>
          <Row className="mb-3">
            <Col>
              <input className="form-control"  
                     label="email addres"
                    id="email"
                    type="text"
                    name="email"
                    size="lg"
                    required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <input type="password" className="form-control"            
                    label="Password"
                    id="formControlLg"
                     name="password"
                     size="lg"
                    
                    required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <h6 className="text-primary">Forgot password</h6>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Button variant="success" type="submit" block>
                Login
              </Button>
            </Col>
          </Row>
        </form>

        <Row>
          <Col>
            <h6 className="mt-3">
              Don't have an account? <Link to="/register">Signup</Link>
            </h6>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
