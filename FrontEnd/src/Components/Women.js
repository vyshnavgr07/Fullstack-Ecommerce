import React, { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Data } from '../App';
import axios from 'axios';
const Women = () => {
  const navigate = useNavigate();
 const[Products,setProducts]=useState([]);
 const {addToWishlist}=useContext(Data)
const  isUser=localStorage.getItem("userId")
 useEffect(()=>{
  const fetchProduct=async()=>{
    try {
      const response=await axios.get('https://fullstack-ecommerce-6tus.onrender.com/api/users/viewProduct')
      console.log(response,"response");
      if(response.status=== 200){
        toast.success("product fetched succesfully", {
          toastId: 'success1',
      })
        setProducts(response.data.data)
      }
    } catch(error){
      console.error(error)
      toast("error occured",error)

    }
  }
  // console.log(Products,"women");
fetchProduct()

 },[]);





  const Wproduct = Products.filter((item) => item.category ==='women'); 


  const viewhandle=(id)=>{
    console.log(id,"kund");
    navigate(`/viewproducts/${id}`)
  }

  return (
    <Row className='m-4'>
    {Wproduct?.map((item) => (
      <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3} className='mb-4'>
        <Card className='' style={{ width: '18rem', height: '28rem' }}>
          <Card.Img style={{ width: '100%', height: '10rem', objectFit: 'cover' }} variant='top' src={item.image} />
          <Card.Body>
            <Card.Title className='m-2'>{item.title}</Card.Title>
            <Card.Text>
              <h4><i>MRP:</i>{item.price}</h4>
              {/* <h4 className='text-danger'>{item.description}</h4> */}

              <MDBIcon style={{marginLeft:80, fontSize:25,}} far icon="heart" 
                  
                  onClick={() => 
                    isUser ? addToWishlist(item._id): toast.error("Please login")
                  } />


            </Card.Text>
            <Button onClick={() => viewhandle(item._id)} variant='primary'>
              View Products
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  
  );
};

export default Women;
