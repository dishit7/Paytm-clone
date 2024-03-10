import React,{useState,useEffect}from "react"
import {useNavigate} from "react-router-dom"
import SendMoney from "../components/SendMoney"
import InputBox from "./InputBox"
import axios from "axios"

export default function Users ({username}){
    const [user ,setUser ]=useState([{
        firstName:"Dishit",
        lastName:"Karia",
        id_:1
}])
   const [filter,setFilter]= useState("")
   useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(function(response){
        console.log("the resp is.."+response.data)
        setUser(response.data)
    })
   } ,[filter])
return (
    <>
    
     
         
            <div className="font-bold  text-left mt-2">Users   </div>
             <InputBox onChange={(e)=>{
                console.log("the val is "+ e.target.value)
                setFilter(e.target.value)}} />
           <div>
           { user.map((user)=>{
            console.log("the user is " +user)
            return(
            
            <User user={user} />
            )
            })}
           </div>
               
        
    </>
)
} 


const User=({user})=>{
    const Navigate = useNavigate()
    const handleClick=(e)=>{
        
        Navigate("/send?to="+user._id+"&&name="+user.firstName+" "+user.lastName)
    }
    return(
        <>
        <div className="flex justify-between mt-4">
        {console.log({user})}
           <div className="flex" >
            <div className="bg-gray-600 rounded-full h-6 w-6 flex justify-center">
               {user.firstName[0]}
            </div>
            <div  >
                    {user.firstName}{user.lastName}
 
               </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>SendMoney</button>
                </div>
        </>
    )
}