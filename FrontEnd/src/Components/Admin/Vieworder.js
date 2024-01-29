import React, { useContext, useEffect, useState } from 'react';


import { Axios } from '../../App';
import SideBar from '../SideBar';


export default function Alloders() {
    // const {login} = useContext(Productcontext)
    const [data, setData] = useState([])
    console.log(data)
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await Axios.get(`api/admin/orders`)
          if(response.status === 200){
            setData(response.data.products)
          }
        } catch (error) {
          
        }
      }
      fetchOrders()
    },[])
  return (
   
    <diV className='d-flex'>
      
      <div  >
      <SideBar/>

      </div>

    

    <div className='mt-5 container'>
      <h2 className='fw-bold' style={{textAlign:'center'}}>All Orders</h2>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Product ID</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            {/* <th scope='col'>OrderId</th> */}
            <th scope='col'>PaymentId</th>
            <th scope='col'>Total</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.date}</td>
              <td>{product.time}</td>
              <td>{product.order_id}</td>
              <td>${product.payment_id}</td>
              <td>{product.total_amount}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </diV>
   
  );
}