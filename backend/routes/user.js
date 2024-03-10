const express=require("express")
const mongoose =require("mongoose")
const {User}=require("../db")
const {Account}=require("../db")
const router=express.Router()
const z=require("zod")
const jwt=require("jsonwebtoken")
const JWT_SECRET=require("../config")
const userAuthorization=require("../middleware/user")
const TranseferFundsWithTransactions=require("../transaction")
const { default: TransferFundsWithTransactions } = require("../transaction")
const signupSchema=z.object({
   firstName:z.string(),
   lastName:z.string(),
   userName:z.string(),
   password:z.string().min(6)

})
router.post("/signup",async(req,res,next)=>{
 const {firstName,lastName,userName,password}=req.body
 try{ 
     console.log("the password is "+password)
   const validInput=signupSchema.parse(req.body)
 const user=await User.create({
    firstName:firstName,
    lastName:lastName,
    userName:userName,
    password:password
 })
 const userId=user._id
 const result=await Account.create({
     userId,
     balance:(1+Math.random()*1000)
 })
 res.send("done")
}catch(err){
   console.log(err)
}
})
 router.post("/signin",async (req,res,next)=>{
   const { userName,password}=req.body
   try{
       const user =await User.findOne({
         userName:userName,
         password:password
       })
       console.log(user._id)
       if(user ){
         // console.log(user._id)
          const token=jwt.sign({userId:user._id},JWT_SECRET)
          res.send( {
            token:token
          })
      
      }}
       catch(err){
         console.log(err)
         res.send("user does not exist")
   
   
   }
})

 
router.put("/update",userAuthorization,async(req,res)=>{
   
   try{
   const {firstName,lastName,password}=req.body
   const updateObject={}
   console.log("hi2")
   if(firstName) updateObject.firstName=firstName
   if(lastName) updateObject.lastName=lastName
   if(password) updateObject.password=password
   console.log( updateObject +"updated obj")
   const decodedToken=req.decodedToken
   console.log(decodedToken)
   const update=await User.updateOne(
    {"_id":decodedToken.userId},
    {$set:updateObject}
      )
      if(update.modifiedCount>0){
        res.send("user updated successfully")
      }
}catch(err){
console.log(err)
}})

 

router.get("/bulk",async (req,res)=>{
 const  filter=req.query.filter
 console.log(filter)
 //const reciever=JSON.parse(filter)
   //if(filter.firstName) reciever.firstName=firstName
   //if(filter.lastName) reciever.lastName=lastName
  //console.log(reciever)


 if(!filter ||filter.trim()==="" || filter===undefined){

  const allUsers=await User.find()
  res.send(allUsers)
 }else{
  
  const userExists=await User.find(
    {$or:[
    {firstName:{
      "$regex":filter}},
    {lastName:{
      "$regex":filter}}
    ]
    }
    )
    console.log(userExists)
     if(userExists.length>0){
   
       res.send( userExists)
     }
     else{
       res.send("the user does not exist")
   
     }
   

 }
})



router.get("/balance",userAuthorization,async(req,res,next)=>{
    const userId= req.userId
    console.log("the user id is: "+userId)
    const user=await Account.findOne({userId:userId})
    res.send(user.balance.toString()) 
    console.log("the user is"+user)
    
})


router.put("/transactions",userAuthorization,async(req,res,next)=>{
      
      try{  
      const session= await mongoose.startSession()
      session.startTransaction()
      const {amount,to}=req.body
      const account=await Account.findOne({userId:req.userId}).session(session)
      console.log(account)
      console.log("amount is "+amount)
      if(!account){
        await session.abortTransaction()
        return res.status(400).json({
          msg:"Invalid Account"
        })
      }
      if (account.balance<amount){
          
        return res.send("Insufficient Balance")
      }

      const toAccount =await Account.findOne({userId:to}).session(session)
       if(!toAccount){
        await session.abortTransaction()
        return res.send("Invalid Account")
       }
      console.log(toAccount)
       await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}})
       await Account.updateOne({userId:to},{$inc:{balance:amount}})

       await session.commitTransaction()
       
       res.send("Transaction Successfull")
      }
      catch(err){
        console.log(err)
      }

})
module.exports=router 