import React, { useContext, useEffect, useState } from 'react'

import { FaEdit } from "react-icons/fa";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar';
import { toast } from 'react-toastify'; 
import { Axios } from '../../App';
const AdminProduct = () => {
  const navigate=useNavigate();
  
  const[product,setProduct]=useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response=await Axios.get("api/admin/allproduct")
        // console.log(response,"rusk");
        if(response.status === 200) {
          setProduct(response.data.data)
        }
// console.log(product);
        
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
      fetchProducts()
  },[])

  const handleRemove = async (productId) => {

    






    try {
      await Axios.delete("api/admin/deleteproducts", {
        data: { productId },
      });
  
      setProduct(prevProducts => prevProducts.filter(item => item._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };



  const handleEdit = (productId) => {
  
    navigate(`editpro/${productId}`);
  };







  return (
<div className='d-flex'>
      <div className="col-md-3">
        <SideBar />
      </div>

      <div>
        <section className="navu h-100" style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                    ALL Products
                  </MDBTypography>
                  <div>
                    <p className="mb-0">
                      <span className="text-warning"> </span>
                      <a href="#!" className="text-danger">
                        <i className="fas fa-angle-down mt-1"></i>
                      </a>
                    </p>
                  </div>
                </div>

                {product && product.map((item) => (
                  <MDBCard key={item._id} className="rounded-3 mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="12" lg="6" xl="4">
                          <MDBCardImage className="rounded-3" fluid src={item.image} alt="products" />
                        </MDBCol>
                        <MDBCol md="12" lg="6" xl="8">
                          <p className="lead fw-normal mb-2">{item.title}</p>
                          <p>
                            <span className="text-muted">Descrption: </span>{item.description} <br />
                            <span className="text-muted">Color: </span>Grey
                          </p>
                        </MDBCol>

                        <MDBCol md="12" lg="6" xl="4">
                          <MDBTypography tag="h5" className="mb-0">
                            {item.price}
                          </MDBTypography>
                        </MDBCol>

                        <MDBCol md="12" lg="6" xl="4" className="text-end">
                          <a className="text-primary">
                            <MDBIcon onClick={() => handleEdit(item._id)} icon="pen" size="lg" />
                          </a>
                        </MDBCol>

                        <MDBCol md="12" lg="6" xl="4" className="text-end">
                          <a  className="text-danger">
                            <MDBIcon onClick={() => handleRemove(item._id)} icon="trash text-danger" size="lg" />
                          </a>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  )
}

export default AdminProduct