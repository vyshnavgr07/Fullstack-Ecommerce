const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
    userid:String,
    products:[{ type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
    date:{type:String,default:new Date().toLocaleDateString()},
    time:{type:String,default:new Date().toLocaleTimeString()},
    order_id:String,
    payment_id:String,
    total_amount:Number

})

const orders = mongoose.model('Orders',orderSchema);

module.exports = orders;