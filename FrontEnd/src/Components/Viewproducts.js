import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Axios } from '../App';

const Viewproducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Initialize product as null
  const { login, loginuser } = useContext(Data);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // Initialize userId using useState
  const { id } = useParams();
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await Axios.get(`api/users/products/${id}`);
        if (response.status === 200) {
          toast.success("Product fetched successfully", { toastId: 'success1' });
          setProduct(response.data.data);
        }
      } catch (error) {
        toast.error("Error occurred while fetching product data");
        console.error("Error fetching product data:", error);
      }
    };
    fetchedData();
  }, [id]); // Include id in the dependency array

  const handleAddToCart = async (productId) => {
    try {
      const response = await Axios.post(`api/users/${userId}/addCart`, { productsId: productId });
      if (response && response.data && response.data.status === "success") {
        toast.success('Product successfully added to the cart');
      } else {
        
        toast.error('Unexpected response structure');
      }
    } catch (error) {
     
      toast.error(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  // Check if product is null or undefined before accessing its properties
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-5 m-3'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6'>
          <Card className='w-100 shadow'>
            <Card.Img
              className='mx-auto mt-3 img-fluid rounded'
              style={{ width: "15rem", height: "10rem", objectFit: "cover" }}
              variant='top'
              src={product.image}
              alt={product.title}
            />
            <Card.Body className='text-center'>
              <Card.Title className='mb-3'>{product.title}</Card.Title>
              <h3 className='text-warning'>Rs {product.price}</h3>
              <h3 className='text-muted'>{product.description}</h3>
              <Button
                className='btn btn-success'
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Viewproducts;
