const mongoose=require("mongoose")
const {Schema} =mongoose
mongoose.connect("mongodb+srv://dishit7:Bulbasaur_47@cluster0.9xcq530.mongodb.net/")
console.log(mongoose.connection)
console.log("connected")
const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    password:String

})
const accountSchema=new mongoose.Schema({
    balance:{
        type:Number,
        required:true
    },
    userId:{type:Schema.Types.ObjectId,ref:"User"}
}
    )
const User=new mongoose.model("User",userSchema)
const Account=new mongoose.model("Account",accountSchema)
module.exports={User,Account};