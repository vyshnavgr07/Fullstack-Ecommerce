require("dotenv").config();
const cors = require('cors');
const mongoose=require("mongoose");
const express =require("express")
const bodyParser=require('body-parser')
const userRouter=require("./routes/userRouter")
const adminRouter=require("./routes/adminRouter")
const app=express()
const port =4000

app.use(cors());
const mongodb="mongodb+srv://vyshnavgr07:WSwTcAuNANa161a5@cluster0.tmwbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
    // useNewUrlParser:true,
    // useUnifiedTopolgy:true,

    main().catch((err)=>{ 
        console.log(err);
    })

    async function main(){
        await mongoose.connect(mongodb)
        console.log("db connected");
    }




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.json())

app.use("/api/admin",adminRouter) 
app.use("/api/users",userRouter)








app.listen(port,()=>{
    console.log("server is running on port",port);
})

