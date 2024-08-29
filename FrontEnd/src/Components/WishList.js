import React, { useContext, useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import { Axios } from "../App";
import { toast } from "react-toastify";



export default function Wishlist() {
    const userId = localStorage.getItem("userId")
   // const {wishLit ,fetchWishList,setWishlist} =
   //    useContext(Productcontext);
   //    fetchWishList(userId,setWishlist)

   const [products ,setProducts] = useState([])
      const navigate = useNavigate();
  //  const{addToWishlist}=useContext(Data)

      const fechWishList = async () => {
         try {
            const  response = await Axios.get(`api/users/showwishlist/${userId}`)
            console.log(response,"ressssss")
            if(response.status === 200) {
                setProducts(response.data.data)
            }
            
        } catch (error) {
            console.log(error)
        }
      }
      
 useEffect(() => {

    fechWishList()
   },[])

   // FetchWishlist(loginStatus, userID, setWishlist);

   const removeFromWishlist = async (productId) => {
      console.log(productId)
  

      try {
         const response = await Axios.delete(`api/users/deletewishlist/${userId}`, {
            data: { productId }  // Correct way to pass data in the DELETE request
          });
         console.log(response)
         if(response.status === 200) {
            toast.error(response.data.message)
            await fechWishList()
         }
      } catch (error) {
         
      }

   }

   return (
      <>
     
        <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: "80px" }}>
  <h1 className="mt-5 text-black fw-bolder">
    <span>My</span> Wishlist
  </h1>

  <div className="product-content d-flex justify-content-evenly">
    {products.length !== 0 ? (
      products.map((value) => (
        <div className="box mx-3" key={value._id}>
          <div className="box-img">
            <img src={value.image} style={{width:200,}} alt={value.title} />
          </div>
          <h3>{value.title}</h3>
          <div className="inbox">
            <span className="strike-price">{/* Add the strike-through price if needed */}</span>
            <span className="price">RS {value.price}</span>
          </div>
          <div className="heart">
            {products.some((item) => item._id === value._id) && (
              <MDBIcon
                fas
                style={{color:"red"}}
                icon="heart"
                className="clicked-heart-icon"
                onClick={() => removeFromWishlist(value._id)}
              />
            )}
          </div>
        </div>
      ))
    ) : (
      <h1>Wishlist is Empty!</h1>
    )}
  </div>
</section>

      </>
   );
}
