import React, { useContext, useEffect } from 'react';
import { Data } from '../App';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import './Main.css';

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const isUser=localStorage.getItem("userId")

const Main = () => {
  const navigate = useNavigate();

  const [products,setProduct]=useState([])
  // console.log(products,"products")
  const [search,setsearch]=useState("");
  // const Ser = product.filter((item) => {    
  //   if (search === "") {
  //     return item;
  //   } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
  //     return item;
  //   } else {
  //     return "";
  //   }
  // });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       const response= await Axios.get('api/users/viewProduct');
      //  console.log(response,"respuuu");
      
        
       if(response.status===200){
       toast.success("product fetched success")
        setProduct(response.data.data)
        // console.log(products,"products seet");

       }
      } catch (error) {
        toast.error(error.message);
       
      }
    };
  
    fetchProduct();
  },[]);
  



const handleViewProduct=(id)=>{
  if(isUser){
    navigate(`/viewproducts/${id}`);
  }else{
    toast.error("Please Log in");
  }
}    


  return (
    <div>

<div className='d-flex mx-5 mt-2 ' style={{justifyContent:"flex-end"}}>    
  <form class="form-inline "  >
    <input class="form-control mr-sm-2 bg-info"   onChange={(e)=>{setsearch(e.target.value)}}  type="search" placeholder="Search" aria-label="Search"/>
  </form>
</div>




    <Row className="justify-content-center m-4">
      {products.map((item) => (
        <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
          <Card style={{ width: '17rem' }}>
            <Card.Img style={{ width: '15rem', height: '10rem' }} variant="top" src={item.image} alt='Loading...' />
            <Card.Body className="text-center">
              <Card.Title className='mt-2'>{item.title}</Card.Title>
              <Card.Text>
                <h2>
                  RS {item.price}

              </h2>
              
                {/* <h2>RS {item.price}</h2> */}
                <h4 className='text-danger'>{item.description}</h4>
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

