import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../App';
import { toast } from 'react-toastify';
console.log("editProductsssssssssssss");
const EditPro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: '',
    gender: '', // Added gender
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await Axios.get(`api/users/products/${id}`);
 
        if (response.status === 200) {
          
          const { _id, title, description, price, image, category, gender } = response.data.data;

          setProductData({ id: _id, title, description, price, image, category, gender });
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the productData state when any input field changes
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(`api/admin/products/`, productData);
     
      if (response.status === 200) {
        toast.success('Product edited successfully');
        navigate(`/adminproduct`);
      }
    } catch (error) {
      console.error('Error editing product:', error);
      toast.error('Failed to edit product.');
    }
  };

  return (
<> 


    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-center">Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" className="form-control" value={productData.title} onChange={handleChange} />

              <label htmlFor="category">Category</label>
              <input type="text" name="category" className="form-control" value={productData.category} onChange={handleChange} />

              <label htmlFor="price">Price</label>
              <input type="text" name="price" className="form-control" value={productData.price} onChange={handleChange} />

              <label htmlFor="description">Description</label>
              <input type="text" name="description" className="form-control" value={productData.description} onChange={handleChange} />

              <label htmlFor="image">Image</label>
              <input type="text" name="image" className="form-control" value={productData.image} onChange={handleChange} />

              <label htmlFor="gender">Gender</label>
              <input type="text" name="gender" className="form-control" value={productData.gender} onChange={handleChange} />

              <button type="submit" className="btn btn-success mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
  </section>
  </>
  );
};

export default EditPro;
