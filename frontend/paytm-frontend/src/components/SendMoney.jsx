import React,{useState} from "react"
import { useNavigate,useSearchParams} from "react-router-dom";
import axios from "axios"
export default function SendMoney(){
    const [receiever,setReciever]=useState({
        firstname:"Dishit",
        lastname:"Karia",
        id_:1
    })

    const [amount,setAmount]=useState(0)
  const navigate=useNavigate()  
  const [searchParams,setSearchParams]=useSearchParams()

  const handleClick = async ()=>{
    console.log(localStorage.token)
    const response =await axios.put("http://localhost:3000/api/v1/user/transactions",{
        amount:amount,
        to:searchParams.get('to')
    },{headers:{authorization:localStorage.token}})
    alert(response.data)
  }

  const handleChange =(e)=>{
    setAmount(e.target.value)
  }
return(

    <div>
     
       <div className="min-h-screen    bg-slate-800 flex  justify-center items-center">
       <div className="flex flex-row justify-center   bg-white w-80 h-min rounded-lg m-1 p-3">
       <div className="font-bold  text-2xl text-center">SendMoney
       

       <div className="flex justify-start items-center mt-7">
        <div className="rounded-full  w-8 bg-slate-500 flex justify-center items-center">{receiever.firstname[0]}</div>
        <div className="ml-3">{searchParams.get('name')} </div>
       </div>
       <div className=" font-semibold  text-base mt-2 text-left">Amount (in Rs)</div>
       <input className="font-normal mt-1"placeholder="Enter amount" onChange={handleChange}/>

       <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleClick}>Initiate Transfer</button>
       </div>
     
       </div>
       
       </div>
       
       </div>
)
}