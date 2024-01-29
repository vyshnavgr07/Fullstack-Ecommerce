import React, { useContext } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { BsCartFill } from 'react-icons/bs';
import { AiFillCalendar } from "react-icons/ai";
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Data } from '../App';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import "./Header.css"

const Header = () => {
  const navigate = useNavigate();
  // const { login, setLogin, userData} = useContext(Data);
const id=localStorage.getItem("userId")



  const logout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("role")
    localStorage.removeItem("jwt")
    localStorage.removeItem("email")

    navigate('/');
    
    toast.error('You have logged out');
  };




const carticon = () => {
     
      navigate('/cart');
   
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
  };

 

  return (
    <div>
      <Navbar expand="lg" className="body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/" className="company-logo">
            <div style={{ ...logoStyles, animation: 'spin 1.5s infinite' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6347', fontFamily: 'cursive', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Shoe</span>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db', fontFamily: 'cursive', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Shop</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          

          <Navbar.Collapse id="responsive-navbar-nav"  >
         

          {/* <span className="navbar-toggler-icon" style={{ backgroundColor: 'black' }}></span> */}
            <Nav className="me-auto my-2 my-lg-0 fw-bold" style={{ maxHeight: '100px' }} navbarScroll variant="black">
            
              <Nav.Link onClick={() => navigate('/main')}>All Category</Nav.Link>
              <Nav.Link onClick={() => navigate('/men')}>MEN</Nav.Link>
              <Nav.Link onClick={() => navigate('/women')}>WOMEN</Nav.Link>
              
            </Nav>

            <Nav className="d-flex my-3 nav-left  fw-bold" navbarScroll>
              
                <Nav.Link className="text" onClick={() => navigate('/login')}>
                  Login
                </Nav.Link>

                <Nav.Link className="text-danger" onClick={logout}>
                  LogOut
                </Nav.Link>
              
               
            
          <BsCartFill style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }} onClick={carticon} />

             <AiFillCalendar  style={{ width: '2rem', height: '2rem', marginLeft: '1rem', cursor: 'pointer' }} onClick={() => navigate(`/orderDetails/${id}`)} />
             </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
