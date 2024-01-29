import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import SideBar from "../SideBar";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");  // Reordered category

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !price || !description || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category); // Reordered category
    console.log("img", image);

    try {
      const jwtToken = localStorage.getItem('jwt');
      const response = await axios.post(
        "http://localhost:4000/api/admin/products",
        formData,
        {
          headers: {
            Authorization: jwtToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response,"qwertyui");

      if (response.status === 201) {
        toast.success("Product added successfully!");
        navigate("/adminproduct");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className='d-flex'>
    <div className='flex-shrink-0'>
      <SideBar/>
    </div>
    <section className='flex-grow-1'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="text-center">Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image-1
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  placeholder="img-1"
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
  
              <button type="submit" className="btn btn-success mt-2 mb-5">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  );
}

export default AddProduct;
