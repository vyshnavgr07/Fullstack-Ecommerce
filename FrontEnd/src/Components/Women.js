import React, { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';

const Women = () => {
  const navigate = useNavigate();
 const[Products,setProducts]=useState([]);

 useEffect(()=>{
  const fetchProduct=async()=>{
    try {
      const response=await Axios.get('api/users/viewProduct')
      // console.log(response,"response");
      if(response.status=== 200){
        toast.success("fetched succesfully")
        setProducts(response.data.data)
      }
    } catch(error){
      toast("error occured",error)

    }
  }
  // console.log(Products,"women");
fetchProduct()

 },[]);





  const Wproduct = Products.filter((item) => item.category === 'women'); 
  console.log(Wproduct);

  return (
    <Row className='m-4'>
      {Wproduct.map((item) => (
        <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} className='mb-4'>
          <Card className='' style={{ width: '18rem' }}>
            <Card.Img style={{ width: '15rem', height: '10rem' }} variant='top' src={item.image} />
            <Card.Body>
              <Card.Title className='m-2'>{item.title}</Card.Title>
              <Card.Text>
                <h2>
                  RS {item.price}
                </h2>
                
              </Card.Text>
              <Button onClick={() => navigate(`/viewproducts/${item.id}`)} variant='primary'>
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
