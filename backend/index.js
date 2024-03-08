const express = require("express")
const mainRouter=require( "./routes/index")
const app=express()   
const jwt=require("jsonwebtoken")
const cors=require("cors")
app.use(express.json())
app.use(cors())

app.get("/paytm",(req,res)=>{
    res.send("hi")
})
app.use("/api/v1",mainRouter)

 
app.listen(3000,()=>{
    console.log(`server is running on port 3000`)
})
