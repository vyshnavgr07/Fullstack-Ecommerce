
const bcrypt=require("bcrypt");
const User=require("../modles/UsersSchema");
const { joiUserSchema } = require("../modles/validationSchema");
const jwt=require("jsonwebtoken")
const products=require("../modles/ProductSchema");
const order=require("../modles/orderSchema")
const { default: mongoose } = require("mongoose");
const Order = require("../modles/orderSchema");
const stripe=require("stripe")(process.env.stripe_secret);
let sValue=[];
const userService=require("../services/userService");
const Product = require("../modles/ProductSchema");


module.exports={
       
    userRegister:async(req,res)=>{
        const {value,error}=joiUserSchema.validate(req.body);
        if(error){
            res.status(400).json({ 
                status:'Error',
                message:'Invalid user input.plese check data' 
            });
        }

        const {name,email,username,password}=value;
        const hasedPassword=await bcrypt.hash(password,10) 
       
        await User.create({
            name:name, 
            email:email,
            username:username,
            password:hasedPassword,
        });

        res.status(201).json({
            status:"status",
            message:"User registration Succesfull"
        });

    },

    // userLogin:async(req,res)=>{
    //     const {value,error}=joiUserSchema.validate(req.body);
    //   console.log(value,"valuee")

    //     if(error){
    //         res.json(error.message);
    //     } 

    //     const {email,password}=value; 
    //     const user=await User.findOne({
    //         email,
    //     });  
    //     console.log(user,"jjj") 
    //     if(!user){  
    //         return res.status(404).json({
    //             status:"error",
    //             message:"User not found" 
    //         }); 
    //     }    

    //     if(!password ||!user.password){
    //         return res 
    //         .status(400)
    //         .json({status:"error",message:"Invalid input"});

    //     }

    //     const passwordMatch=await bcrypt.compare(password,user.password);
    //     if(!passwordMatch){
    //         return res
    //         .status(401)
    //         .json({error:"error",message:"incorrect password"});
    //     }

    //     const token=jwt.sign(
    //         {email:user.email},
    //         process.env.USER_ACCES_TOKEN_SECRET,
    //         {
    //             expiresIn:86400,
    //         }
    //     );
 
    //     res
    //     .status(200)
    //     .json({status:"success",
    //     message:"Login Succesfull",
    //     Data:token,user
    //   })
        
  
    //      },


    userlogin:async(req,res)=>{
      const {value,error}=joiUserSchema.validate(req.body)
      // console.log(value)
      if(error){
          return res.json(error.message)
      }
      const {email,password}=value
      const user =await User.findOne({
          email:email,
      })
      const id=user.id
      const Username=user.username
      if(!user){
      return res.status(404).json({
          status:"errror",
          message:"User not found"
      })
      }
      if(!password || !user.password){
          return res.status(400).json({
              status:"error",
              message:"invalid input"
          })
      }
      const passwordmatch=await bcrypt.compare(password,user.password)
      if(!passwordmatch){
          return res.status(401).json({
              status:"error",
              message:"incorrect password"
          })
      }
      
      const Token=jwt.sign({email:user.email},process.env.USER_ACCES_TOKEN_SECRET,{
          expiresIn:8500
      })
      res.status(200).json({
          status:"success",
          message:"Login Successfull",
          data:{id,email,Token,Username }
      })
      },


         //user view all products

         viewProduct: async (req, res) => {
            try {
              const product = await userService.viewproduct();
              res.status(200).send({
                status: "success",
                message: "successfully fetched data",
                data: product,
              });
            } catch (error) {
              console.error('Error in viewProduct route:', error);
              res.status(500).send({
                status: "error",
                message: "Internal server error",
              });
            }
          },

       //specific products

       productById:async(req,res)=>{
        // const productId=req.params.id;
        // const prod=await products.findById(productId);
        const prod=await userService.productById(req.params.id)
        if(!prod){
            return res.status(404).json({
                status:'error',
                message:"product not found"
            });
        }
        res.status(200).json({
            status:"success",
            data:prod
        })
       },
 
       //add to cart 
       addToCart: async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
      
        if (!user) {
          return res.status(404).send({
            status: "failed",
            message: "User not found",
          });
        }
      
        const { productsId } = req.body;
        console.log(productsId);
      
        if (!productsId ) {
          return res.status(400).send({
            status: "failed",
            message: "Product ID is required in the request body",
          });
        }
      
        // Check if the product exists
        const product = await Product.findById(productsId);
        if (!product) {
          return res.status(404).send({
            status: "failed",
            message: "Product not found",
          });
        }

        const isProductInCart = user.cart.some(item => item.productsId.equals(productsId));
  
        if (isProductInCart) {
          return res.status(400).send({
            status: "Failure",
            message: "Product is already in the cart",
          });
        }
        
      
        // Add the product to the cart
        await User.updateOne({ _id: userId }, { $addToSet: { cart: { productsId: productsId} } });
      
        res.status(200).send({
          status: "success",
          message: "Product successfully added to the cart",
        });
      },

      updateCartItemQuantity: async (req, res) => {
        const userID = req.params.id;  
        const { id, quantityChange } = req.body;
        console.log(req.body)
        
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }
      
        const cartItem = user.cart.id(id);
        if (!cartItem) { return res.status(404).json({ message: 'Cart item not found' }) }
      
        cartItem.quantity += quantityChange;
      
        if (cartItem.quantity > 0) {
          await user.save();
        }
      
        res.status(200).json({
          status: 'success',
          message: 'Cart item quantity updated',
          data: user.cart
        });
      },

      removeCartProduct : async  (req, res) => {
    
        const userId = req.params.id
        const itemId = req.params.itemId
        console.log("itemId" ,itemId)
        if(!itemId){
          return res.status(404).json({message:"Product Not fount"})
        }
    
        const user = await User.findById(userId)
        if(!user){
          res.status(404).json({message:"User not fount"})
        }
        const result = await User.updateOne(
          { _id: userId },
          { $pull: { cart: { productsId:itemId } } }
        );
      
        if (result.modifiedCount > 0) {
          console.log("Item removed successfully");
          res.status(200).json({message:"Product removed successfuly",data: result})
        } else {
          console.log("Item not found in the cart");
        }
    
    
      },




      

       // cart view
      viewCartProduct:async(req,res)=>{  
        const userId=req.params.id;
        
        
        const user = await User.findById(userId).populate({
          path: 'cart.productsId',
          model: 'Product',
        });

        if(!user){
            return res
            .status(404).json({
                status:"failed",  
                message:"user not found"
            })
        }
        const cartProductsId=user.cart; 

       

        if(cartProductsId.length === 0){  
            return res.status(200).json({
                status:"success",
                message:"cart is empty",  
                data:[]
            })
        }
        
        
        const cartProducts = user.cart;

        console.log(cartProducts,"huhuh");
        res.status(200).json({
            status:"success",
            message:"Cart products fetched succesfully",
            data:cartProducts,
        });

},


//add to wishlist
addwishlist:async(req,res)=>{
    const userId=req.params.id;
     if(!userId){
        return res.status(404).json({
            status:"failure",
            message:"User Not Found!"
        })
     }

     const {productId}=req.body;
     const user= await User.findById(userId);

    //  console.log(prod,"this is prod");

    if (!user){ 
        return res.status(404).json({
            status:"failure",  
            message:"no product found"
        })
    }

    const findprod = await User.findOne({ _id: userId, wishlist: productId });
    // console.log(findprod,"this is the product");  
    if (findprod) {
        return res.status(404).json({
            status: "failure",
            message: "Product already in wishlist"
        });
    } 
    
    const updateResult = await User.updateOne({ _id: userId }, { $push: { wishlist: productId } });
    console.log(updateResult,'xdf')

    
        // Check if the update was successful
        return res.status(201).json({
            status: "success",
            message: "Product successfully added to wishlist",
            data: updateResult
        });
    
},

showWishList:async(req,res)=>{
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(!user){
        return res
        .status(404)
        .json({status:'failed',
    message:"user not found"})
    }

    const wishProdId=user.wishlist;
    if(wishProdId.length===0){
        return res.status(200).json({
            status:"success",
            message:"user wishlist is empty",data:[]
        })
    }

    const wishProducts=await products.find({_id:{$in:wishProdId}});
    res.status(200).json({
        status:"Success",
        message:"Wishlist product fetched succesfully",
        data:wishProducts
    });
},

delete:async(req,res)=>{
    const userId=req.params.id;
    const {productId}=req.body;
    if(!productId){
        return res.status(400).json({
            message:"product not found"
        });
    }

    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    await User.updateOne({_id:userId},{$pull:{wishlist:productId}});
    res.status(200).json({message:"Succesfully removed from wishlist"})
},


payment:async(req,res)=>{
    const userId=req.params.id;
    const user = await User.findOne({_id: userId }).populate("cart.productsId");
    // console.log("uuu",user)
    if(!user){
        return res.status(404).json({
            message:"User Not found"  
        });
    }

    const cartProducts=user.cart  
    console.log("cartuuuuu",cartProducts,);
    if(cartProducts.length===0){
        return res.status(200).json({"status":"success",message:"Cart is empty",data:[]});
    }
 
    const lineItems=cartProducts.map((item)=>{
      // console.log(item.productsId.price,"pprr");
      const unit_amount = Math.round(item.productsId.price * 100);
        return{ 
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.productsId.title,
                    description:item.productsId.description 
                },
                unit_amount,
            },
            quantity:item.quantity, 
        };
    });
    // console.log('iii',lineItems) 

       let  session = await stripe.checkout.sessions.create({  
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:3000/paymentSuccess`, 
 
      });

    console.log("sessionnn",session)
    if(!session){ 
        return res.json({
            status:"Failure",
            message:"Error occured on session side",
        });
    }
   sValue={ 
        userId,
        user,
        session,
    };  
    // console.log('svalueee',sValue) 
    
    res.status(200).json({
        status: "Success",
        message: "Strip payment session created",
        url: session.url,
      });
},


success: async (req, res) => {
    try {
      const { id, user, session } = sValue;
      console.log(session,"ussssssssssss");
      const userId = user._id;
      // console.log(userId,"zzzzzzzzzzz");
      const cartItems = user.cart;
  
     
      const orders = await Order.create({
        userId: id,
        products: cartItems.map((value) => new mongoose.Types.ObjectId(value._id)),
        order_id: session.id,
        payment_id: `demo ${Date.now()}`,
        total_amount: session.amount_total / 100,
      });
  
      if (!orders) {
        return res.json({ status: "failure", message: "Error occurred while inputting to order DB" });
      }
  
      const orderId = orders._id;
  
      const userUpdate = await User.updateOne( 
        { _id: userId },
        {
          $push: { orders: orderId },
          $set: { cart: [] },
        },
        { new: true }
      );
  
      if (userUpdate) {
        res.status(200).json({
          status: "Success",
          message: "Payment successful.",
        });
      } else {
        res.status(500).json({
          status: "Error",
          message: "Failed to update user data",
        }); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: "An error occurred",
        error_message: error.message,
      });
    }
  },

//   orderDetails: async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const user = await User.findById(userId).populate('orders');
//   // console.log(user,"jjj")
//         if (!user) {
//             return res.status(404).json({
//                 status: "failure",
//                 message: "User Not Found",
//             });
//         }
  
//         const orderProducts = user.orders;
//         // console.log(orderProducts,"ooorrr")

//         if (orderProducts.length === 0) {
//             return res.status(200).json({
//                 message: "You don't have any product orders",
//                 data: [],
//             });
//         }
//         const ordersWithProducts = await Order.find({ _id: { $in: orderProducts } })
//         .populate('products');
    
//         console.log(ordersWithProducts, "ordered"); 
  
//         res.status(200).json({
//             message: "Ordered Products Details Found",
//             data: ordersWithProducts,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: "failure",
//             message: "Internal Server Error",
//         });
//     }
// }

orderDetails: async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('orders');

    if (!user) {
      return res.status(404).json({
        status: 'failure',
        message: 'User not found',
      });
    }

    const orderProducts = user.orders;

    if (orderProducts.length === 0) {
      return res.status(200).json({
        message: "You don't have any product orders",
        data: [],
      });
    }

    const ordersWithProducts = await Order.find({ _id: { $in: orderProducts } })
      .populate('products');

    res.status(200).json({
      message: 'Ordered Products Details Found',
      data: ordersWithProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: 'Internal Server Error',
    });
  }
},
    

         


}
