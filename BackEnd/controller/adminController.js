const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const Users=require("../modles/UsersSchema");
const UsersSchema = require("../modles/UsersSchema");
const {joiPoductSchema}=require("../modles/validationSchema")
const products=require("../modles/ProductSchema")
const order=require("../modles/orderSchema")
const adminService=require("../services/adminService")

module.exports=     {
 login: async (req,res) => {
  console.log("reesssss")
        const { email, password } = req.body;     
     
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const token = jwt.sign(
            { email },
            process.env.ADMIN_ACCESS_TOKEN_SECRET 
          );  
          return res.status(200).send({
            statu: "Succes",
            message: "Admin registratin succesfull",
            Data:{token},
           
          });
        
        } else {
          return res.status(404).json({
            status: "error",
            message: "Thsi is no an admin ",
          });
        }
      },

      


        //to find all user

allUser:async(req,res)=>{ 
    // const allUser=await UsersSchema.find(); 
    const allUser= await adminService.adminAllUser()
   
    if(allUser.length ===0){
        return res.status(404).json({
            status:"error",
            message:"User not found" 
        })
    }
    res.status(200).json({
        status:"succesfully",
        message:"sucessfully feched user data",   
        data:allUser,
    })
},

//specific user

useById:async(req,res)=>{
// const userId=req.params.id;
// const user=await Users.findById(userId);
const user= await adminService.adminUserById(req.params.id)

if(!user){
    return res.status(404).json({
        status:"error",
        message:"Users not found" 
    });
}

res.status(200).send({
    status:"Succes",
    message:"Succesfully find user",
    data:user,
});

},

// to create product 

creatProduct:async(req,res)=>{
    const {value,error}=joiPoductSchema.validate(req.body);
   
    const {title,description,price,image,gender,category}=value;
     
    if(error){
        return res.status(400).json({error:error.details[0].message});

    }else{ 
        await products.create({
            title,
            description,
            price,
            image,
            gender,
            category,
        });

        res.status(201).json({ 
  
            status:"success",
            message:"Succesfully Created products",
            data:products,
        });
    }
},
 
//view all product by category

allProduct:async(req,res)=>{
   
    // const prods=await products.find()

    const prods=await adminService.allProducts();
    
    if(!prods){
        return(
            res.status(404),
            send({
                status:"error",
                message:"products not found",
            })
        );
    }
    res.status(200).json({
        status:"success",
        message:"succesfully fetched the products details",
        data:prods,
    })
},
productById:async(req,res)=>{
    // const productId=req.params.id;
    // const product=await products.findById(productId)

    const product=await adminService.productById(req.params.id)
    if(!product){ 
        return res.status(404).send({
            status:'error',
            message:"product not found"
        });b 
    }
    res.status(200).json({
        status:"success",
        message:"Succesfully fetched product details",
        data:product
    });
},

deleteProduct:async(req,res)=>{
    const {productId}=req.body
    if(!productId||!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({
            status:'failure',
            message:"invalid product id provided"
        });
    }

    const deletedProduct=await products.findOneAndDelete({_id:productId});
    // const deletedProduct=await adminService.deleteProducts(productId)

    if(!deletedProduct){
        return res.status(404).json({
            status:"failure",
            message:'product not found in the database'

        });
    }
    return res.status(200).json({
        status:"success",
        message:"deleted succesfully"
    })


},

updateProduct:async(req,res)=>{
    const {value,error}=joiPoductSchema.validate(req.body);

    if(error){
        return res.status(401).send({message:error.details[0].message})
    }

    const {id,title,description,price,image,category}=value;
    const product=await products.findById(id);

    if(!product){
        return res
        .send(404)
        .json({status:"failed",
    message:"product not found in database"})
    }
    await products.findByIdAndUpdate(
        {_id:id},
        {title,
        description,
        price,
        image,
         category}
        );
        res.status(200).json({
            status:"Success",
            message:"product updated succesfully"
        });
},

orderDtails: async (req, res) => {
    const products = await order.find();
    if (products.length === 0) {
      return res.status(200).json({
        message: "No products ",
      }); 
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully fetched order details",
      products,
    });
  },

  status: async (req, res) => {
    const totalRevenue = await order.aggregate([
      {
        $group: {
          _id: null,
          totalProduct: { $sum: { $size: "$products" } },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
    ]);

    if (totalRevenue.length > 0) {
      // You have results
      res.status(200).json({ status: "Success", data: totalRevenue[0] });
    } else {
      // No results found
      res
        .status(200)
        .json({
          status: "Success",
          data: { totalProduct: 0, totalRevenue: 0 },
        });
    }
  },
  userOrderDetails: async (req, res) => {
    const userId = req.params.id;
    //   console.log('User:', userId);
      const user = await Users.findById(userId).populate('Orders')
    // console.log('User:', user);
  
    if (!user) {
        return res.status(404).json({
            status: 'Failure',
            message: 'User Not Found',
        });
    }
  
    const ordProduts = user.orders;
    // console.log('User Orders:', ordProduts);
  
    if (ordProduts.length === 0) {
        return res.status(200).json({
            message: "You don't have any product orders.",
            data: [],
        });
    }
    
    const ordersWithProducts = await Order.find({ _id: { $in: ordProduts } })
    .populate("products")
  
    res.status(200).json({
        message: 'Ordered Products Details Found',
        data: ordersWithProducts,
    });
  }
  









}