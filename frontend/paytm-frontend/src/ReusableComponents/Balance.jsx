import React,{useEffect ,useState}from "react";
import axios from "axios";
export default function Balance (){
     const [amount,setAmount]=useState('0')
     const token=localStorage.token 
     console.log(token)
     //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1ZDNjODdlMjFhOWUwOGNlNWE1NDkiLCJpYXQiOjE3MDk2NjE3OTR9.//n2mUtlpvUlArcHzUMYSJL50u6N-JY7c_dpmKD9WxsAI"
    useEffect(()=>{
        console.log("useEffect called")
        axios.get("http://localhost:3000/api/v1/user/balance",{headers:{
        authorization:token
       }}).then(function(response){
        console.log("the bal is .. "+response.data)
        setAmount(Math.round(response.data))
       })
      },[])
    return(
        <>
        <div className="flex mt-1">
            <div className="font-bold text-lg ml-4 flex">
              Your  Balance 
                 <div className="font-semibold ml-4"> Rs {amount}</div>
            </div>                  
            </div>
        </>
    )
}