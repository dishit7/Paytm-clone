import React,{useState} from "react"
import Heading from "../ReusableComponents/Heading"
import InputBox from "../ReusableComponents/InputBox"
import Button from  "../ReusableComponents/Button"
import BottomWarning from "../ReusableComponents/BottomWarning"
import axios from "axios"
export default function Signup(){
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [userName,setuserName]=useState('')
    const [password,setPassword]=useState('') 
return(
    
    <div>
    {password}
    <div className="flex bg-slate-900 justify-center h-screen w-screen">
    <div className="flex flex-col justify-center" >
        <div  className="bg-white rounded-lg text-center p-2 w-80  h-max px-4">
        <Heading label="Signup"></Heading>
        <InputBox label="First Name" onChange={(e)=>{
            setFirstName(e.target.value)}}/>
        <InputBox label="Last Name" onChange={(e)=>{
                   setLastName(e.target.value)
        }} />
        <InputBox label="Email" onChange={(e)=>{setuserName(e.target.value)}} />
        <InputBox label="Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        <Button label="Signup" onClick={
          ()=>{
            console.log("reached here")
             axios.post("http://localhost:3000/api/v1/user/signup",{
                firstName,
                lastName,
                userName,
                password
                
             })
        }}/>
        <BottomWarning label="If you aleready signup,Click here:" buttontext="Signin" to="/signin"/>
        </div>
        </div>
        </div>
    </div>
)
}