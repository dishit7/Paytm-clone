import React from 'react'
export default function Heading({label}){
    return(
<div className="text-3xl font-bold  text-center" >
{console.log(label)}
    {label}
</div>
)
}