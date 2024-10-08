import './App.css';
import Header from './Common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Product from './Components/Products';
import { createContext, useEffect, useState } from 'react';
import Men from './Components/Men';
import Women from './Components/Women';
import Viewproducts from './Components/Viewproducts.js';
import AdminHome from "./Components/AdminHome"
import Registration from './Components/Registration';
import Footer from './Common/Footer';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './Components/AdminLogin';
import Payment from './Components/PaymentSuccess.js';
import Cartt from './Components/Cartt';
import Users from './Components/Admin/Users';
import AdminProduct from "./Components/Admin/AdminProduct"
import Vieworder from './Components/Admin/Vieworder';
import SideBar from './Components/SideBar';
import AddProduct from './Components/Admin/AddProduct';
import AdminMain from './Components/Admin/AdminMain';
import EditPro from './Components/Admin/EditPro';

import axios from "axios";
import OrderData from './Components/OrderData.js';
import WishList from './Components/WishList.js';
import Navbar from './Common/Navbar.js';
import { PrimeReactProvider } from 'primereact/api';
import Header2 from './Common/Header2.js';
import Text from './Components/Text.jsx';
import Reg from './Components/Reg.jsx';
import Taske from './Components/Taske.js';




export const Axios=axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers:{
    "Content-Type":"application/json",
    Authorization:localStorage.getItem('jwt')
  }
})
console.log(process.env.REACT_APP_API_URL,'env')







export const Data=createContext();



function App() {

const [userData, setUserData ]=useState([]);
const [login, setLogin ]=useState(false);
const[product,setProduct]=useState(Product);
const [cart,setcart]=useState([]);
const [vieworder,setvieworder]=useState([]);

const[loginuser,setloginuser]=useState([]);

const [wishLit ,setWishlist] = useState([])
const [wishStatus, setWishStatus] = useState(false)
  

const userId=localStorage.getItem("userId")




  useEffect(() => {

    const fetchData = async () => {
      try {
        // const response = await Axios.get(`api/users/addtowishlist/${userId}`)
        // if(response.status === 200){
        //   setWishlist(response.data.data)
        //   setWishStatus(true)
        // }
        console.log('hai')
        
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchData()
  },[])

  const addToWishlist = async (productId) => {
    try {
      await Axios.post(`api/users/addtowishlist/${userId}`,{productId})
      const response = await Axios.get(`api/users/showwishlist/${userId}`)
      console.log(response,"repoooo");
      if(response.status === 200){
        toast.success("Added to wishlist")
        setWishlist(response.data.data)

      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }




 


  
  return (
    <div className="App ">
     <Data.Provider value={{product,setProduct,cart,setcart,userData, setUserData,login,setLogin,vieworder,setvieworder,loginuser,setloginuser,addToWishlist}}> 
      <Navbar/>
      <Taske/>
      <Routes>
      <Route  path='/'  element= {<Home />} />
        <Route path='/login'  element= {<Text/>} />
        <Route path='/register'  element= { <Reg/>} />
        <Route path='/main'  element= {<Main/> } />
        <Route path='/men'  element= {<Men/> } />
        <Route path='/women'  element= {<Women/> } />
        <Route path='/viewproducts/:id'  element= {<Viewproducts/> } />
        <Route path='/cart'  element= {<Cartt/>} />
        {/* <Route path='/adminlogin' element={<AdminLogin/>}/> */}
        <Route path='/paymentSuccess'  element={<Payment/>} />
        <Route path='/admin'     element={<AdminHome/>} />
        <Route path='/users'    element={<Users/>}/>
        <Route path='/adminproduct'  element={<AdminProduct/>} />
        <Route path='/vieworder'  element={<Vieworder/>} />  
        <Route path="/sidebar"    element={<SideBar/>} />
        <Route path="/addproduct"    element={<AddProduct/>} />
        <Route path='/adminmain'        element={<AdminMain/>}/>
        <Route path='/adminproduct/editpro/:id' element={<EditPro/>}  />
        <Route path='/orderDetails/:id'element={<OrderData/>}/>
        <Route path='/wishlist' element={<WishList/>}  />

      </Routes>
 
       <Footer/>
     
    </Data.Provider>


   
      <ToastContainer/>
    </div>
  );
}

export default App;
