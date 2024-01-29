import React, { useContext, useEffect, useState } from 'react'
// import { Data } from '../App'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';

const Men = () => {
    const navigate=useNavigate()
    const [products,setProducts]=useState([])

useEffect(()=>{
    const fetchProducts=async()=>{
        try {
            const response=await Axios.get('api/users/viewProduct')
            console.log(response,"asdfghjk");
            if(response.status===200){
                toast.success("product fetched succesfully");
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

    // console.log(MenProduct,"this is menpro");
    return (
        <div>



            <div className='d-flex flex-wrap m-4'>
                {MenProduct.map((item)=>(
                <Card   className='m-2'   style={{ width: '17rem' }}>
                    <Card.Img  style={{width:"15rem", height:"10rem"}}   variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title  className='m-2'>{item.title}</Card.Title>
                        <Card.Text>
                        <h2> RS {item.price} </h2>
                       
                      
                        </Card.Text>
                        <Button  onClick={()=>navigate(`/viewproducts/${item._id}`)}  variant="primary">viewproducts</Button>
                    </Card.Body>
                </Card>
                 ))}
            </div>






        </div>
    )
}

export default Men