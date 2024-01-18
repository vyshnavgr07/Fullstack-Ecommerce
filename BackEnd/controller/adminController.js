const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const Users=require("../modles/UsersSchema");
const UsersSchema = require("../modles/UsersSchema");
const {joiPoductSchema}=require("../modles/validationSchema")
const products=require("../modles/ProductSchema")
const order=require("../modles/orderSchema")
const adminService=require("../services/adminService")

module.exports=     {
    login:async(req,res)=>{
        //const {email,password}=req.body;
        // console.log(process.env.ADMIN_EMAIL);
       const reqBody= adminService.adminLogin(req.body)

       if(reqBody){
        res.status(200).send({
            status:"success",
            message:"Admin registaration succesful",
            data:reqBody

        });
       }
   
        else {
           res.status(404).json({
            status:"error",
            message:"this is not an admin"
          })
     
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
   
    const {title,description,price,image,category}=value;
     
    if(error){
        return res.status(400).json({error:error.details[0].message});

    }else{
        await products.create({
            title,
            description,
            price,
            image,
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

    // const deletedProduct=await products.findOneAndDelete({_id:productId});
    const deletedProduct=await adminService.deleteProducts(productId)

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
}









}