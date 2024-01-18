const jwt=require("jsonwebtoken")
const UsersSchema=require("../modles/UsersSchema")
const products=require("../modles/ProductSchema")


module.exports={
    adminLogin:(adminData)=>{
        if(adminData.email===process.env.ADMIN_EMAIL && adminData.password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(
                {email:adminData.email},
                process.env.ADMIN_ACCESS_TOKEN_SECRET 
            )
            return token
        }              
    }, 

    adminAllUser:async ()=>{
        const allUser=await UsersSchema.find();
       if(allUser){
        return allUser
       }
    },

    adminUserById:async(userId)=>{
        const user=await UsersSchema.findById(userId);
       
        if(user){
            return user 
        }
        
    },
    allProducts:async()=>{
     const prod=await products.find()
     if(prod){
        return prod
     }
    },
    productById:async(proid)=>{
        const prods=products.findById(proid)
        if(prods){
            return prods
        }
    },

    deleteProducts:async(prodid)=>{
        const deleteProduct=await products.findOneAndDelete(prodid)

        if( deleteProduct){
            return deleteProduct
        }

    }
   

} 

