import React from "react"
import Appbar from "../ReusableComponents/Appbar"
import Balance from "../ReusableComponents/Balance"
import Users from "../ReusableComponents/Users"
export default function Dashboard(){
return(
    <div>
     <Appbar />
     <Balance amount="100000" />
     <Users username="Dishit Karia"/>
    </div>
)
}