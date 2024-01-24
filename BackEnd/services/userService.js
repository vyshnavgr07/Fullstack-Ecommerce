const jwt=require("jsonwebtoken")
const products=require("../modles/ProductSchema")  

module.exports={
    viewproduct:async()=>{
        console.log("aaa");
        const prods=await products.find(); 
        console.log(products,"userservice"); 
        if(prods){
            return prods
        }
    },
    productById:async(id)=>{
        prods=products.findById(id);
        if(prods){
            return prods 
        }
        
    }
    
    
}