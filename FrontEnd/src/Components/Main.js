import React, { useContext, useEffect } from 'react';

import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import './Main.css';

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Data } from '../App';

const Main = () => {
  const isUser = localStorage.getItem("userId")

  const navigate = useNavigate();
const {addToWishlist}=useContext(Data)
  const [products,setProduct]=useState([])
  // console.log(products,"products")
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       const response= await axios.get('https://fullstack-ecommerce-6tus.onrender.com/api/users/viewProduct');
    
      
        
       if(response.status===200){
        console.log("product fetched succesfully", {
          toastId: 'success1',
      })
        setProduct(response.data.data)
        // console.log(products,"products seet");

       }
      } catch (error) {
        console.log(error.message);
       
      }
    };
  
    fetchProduct();
  },[]);
  

console.log(products,"prooo");

const handleViewProduct=(id)=>{
  if(isUser){
    navigate(`/viewproducts/${id}`);
  }else{
    toast.error("Please Log in");
  }
}    


  return (
    <div   >

<div className='d-flex mx-5 mt-2  bg-white ' style={{justifyContent:"flex-end"}}>    
  
</div>
<Row className="justify-content-center m-4">
  {products.map((item) => (
    <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
        
      <Card style={{ width: '17rem', height: '100%' }}>
        <Card.Img style={{ width: '100%', height: '10rem', objectFit: 'cover' }} variant="top" src={item.image} alt='Loading...' />
        <Card.Body className="text-center">
          <Card.Title className='mt-2'>{item.title}</Card.Title>
          <Card.Text>
            <h2>RS {item.price}</h2>
            <h4 className='text-danger'>{item.description}</h4>
            <MDBIcon style={{marginLeft:80, fontSize:25,}} far icon="heart" 
                  
                  onClick={() => 
                    isUser ? addToWishlist(item._id): toast.error("Please login")
                  } />
          </Card.Text>
          <Button className='bg-primary' onClick={() => handleViewProduct(item._id)} block variant="danger">
            View Products
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    </div>
  );
};

export default Main;

