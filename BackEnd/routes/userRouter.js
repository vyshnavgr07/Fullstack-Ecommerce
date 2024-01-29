const express=require("express")
const router=express.Router()
const userControler=require("../controller/userController")

const tryCatchMiddleware=require("../middleware/trycatch") 
const verifyToken=require("../middleware/userAuth")

router

.post("/register",tryCatchMiddleware(userControler.userRegister)) 
.post("/userlogin",tryCatchMiddleware(userControler.userLogin))  

.get("/viewProduct",tryCatchMiddleware(userControler.viewProduct))  
.use(verifyToken)
.get("/products/:id",tryCatchMiddleware(userControler.productById))

.post("/:id/addCart",tryCatchMiddleware(userControler.addToCart))
.get("/:id/viewCart",tryCatchMiddleware(userControler.viewCartProduct))
.put("/:id/cart",tryCatchMiddleware(userControler.updateCartItemQuantity))
.delete("/:id/cart/:itemId",tryCatchMiddleware(userControler.removeCartProduct))

.post("/addtowishlist/:id",tryCatchMiddleware(userControler.addwishlist))
.get("/showwishlist/:id",tryCatchMiddleware(userControler.showWishList))
.delete("/deletewishlist/:id",tryCatchMiddleware(userControler.delete))

.post("/:id/payment",tryCatchMiddleware(userControler.payment))
.get("/payment/success",tryCatchMiddleware(userControler.success))
.get("/:id/orders",tryCatchMiddleware(userControler.orderDetails))

module.exports=router       