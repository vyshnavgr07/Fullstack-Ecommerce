const mongoos=require("mongoose")
// const autopopulate = require('mongoose-autopopulate') 

const userSchema=new mongoos.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    cart:[
        {
            productsId:{type:mongoos.Schema.ObjectId,ref:"Product"},
            quantity:{type:Number,default:1}
        }
    ],

    wishlist:[{type:mongoos.Schema.ObjectId,ref:'Product'}], 
    orders: [{ type:mongoos.Schema.ObjectId, ref:'Orders' }],
})
   
  

module.exports=mongoos.model("User",userSchema) 