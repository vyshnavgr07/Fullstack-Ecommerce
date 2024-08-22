import React, { useContext, useEffect, useState } from 'react'
// import { Data } from '../App'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Data } from '../App';
const Men = () => {
    const navigate=useNavigate()
    const [products,setProducts]=useState([])
    const  {addToWishlist} =useContext(Data) 
    const isUser=localStorage.getItem("userId")
useEffect(()=>{
    const fetchProducts=async()=>{
        try {
            const response=await Axios.get('api/users/viewProduct')
            // console.log(response,"asdfghjk");
            if(response.status===200){
                toast.success("product fetched succesfully", {
                    toastId: 'success1',
                })
                setProducts(response.data.data)
                console.log(products,"this is men");
            }
        } catch(error){
            toast.error(error.message)
        };
    };
    fetchProducts();
},[]);



    
    const MenProduct=products.filter((item)=>item.category ==="MEN")
const viewhandle=(id)=>{
  navigate(`/viewproducts/${id}`)
}
    
    return (
   
      <Row className='m-4'>
     {MenProduct?.map((item) => (
  <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} className='mb-4'>
    <Card className='shadow-sm border-0 rounded' style={{ width: '18rem', height: '28rem' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
        <Card.Img
          style={{ width: '100%', height: '12rem', objectFit: 'cover', transition: 'transform 0.3s ease-in-out' }}
          variant='top'
          src={item.image}
          alt={item.title}
          className='hover-zoom'
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.15)', transition: 'opacity 0.3s ease-in-out' }} />
      </div>
      <Card.Body className='p-3'>
        <Card.Title className='m-2 text-center text-primary' style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {item.title}
        </Card.Title>
        <Card.Text className='text-center'>
          <h2 className='text-success' style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ₹{item.price}
          </h2>
          <h4 className='text-danger'>{item.description}</h4>
          <MDBIcon
            style={{ marginLeft: '80px', fontSize: '25px', color: '#ff5252', cursor: 'pointer' }}
            far
            icon="heart"
            onClick={() => (isUser ? addToWishlist(item._id) : toast.error("Please login"))}
            className='hover-grow'
          />
        </Card.Text>
        <Button onClick={() => viewhandle(item._id)} variant='primary' className='w-100 mt-3'>
          View Products
        </Button>
      </Card.Body>
    </Card>
  </Col>
))}
    </Row>
    



       
    )
}

export default Men