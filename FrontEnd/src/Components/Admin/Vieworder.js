import React, { useContext, useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

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

    <MDBTable>
      <MDBTableHead>
      <tr>
            <th scope='col'>Product ID</th>
            <th scope='col'>Date</th>
            <th scope='col'>Time</th>
            <th scope='col'>PaymentId</th>
            <th scope='col'>Total</th>
           
          </tr>
      </MDBTableHead>
      <MDBTableBody>
      {data.map((product) => (
  
        <tr className='table-info'>
          {/* <th scope='row'>Info</th> */}
          <td>{product._id}</td>
              <td>{product.date}</td>
              <td>{product.time}</td>
              <td>${product.payment_id}</td>
              <td>{product.total_amount}</td>
             
        </tr>
          ))}
        
      </MDBTableBody>
    </MDBTable>
    </diV>
   
  );
}