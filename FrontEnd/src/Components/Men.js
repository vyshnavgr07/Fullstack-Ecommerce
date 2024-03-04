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
      {MenProduct.map((item) => (
        <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} className='mb-4'>
          <Card className='' style={{ width: '18rem', height: '28rem' }}>
            <Card.Img style={{ width: '100%', height: '10rem', objectFit: 'cover' }} variant='top' src={item.image} />
            <Card.Body>
              <Card.Title className='m-2'>{item.title}</Card.Title>
              <Card.Text>
                <h2>
                  RS {item.price}
                </h2>
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
    



       
    )
}

export default Men